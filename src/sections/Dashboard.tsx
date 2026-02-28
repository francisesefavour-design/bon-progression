import { useState, useEffect, useRef } from 'react';
import { 
  Users, TrendingUp, Activity, Calendar, 
  ExternalLink, Download, Lock, Unlock, Bell,
  ChevronLeft, ChevronRight, BarChart3, PieChart
} from 'lucide-react';
import { CircularProgress } from '@/components/CircularProgress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { store } from '@/lib/store';
import type { User, Announcement, Group, ProjectRecord, ScriptUpdate, ScriptAccess } from '@/types';

interface DashboardProps {
  user: User;
  onNotification: () => void;
}

export function Dashboard({ user, onNotification }: DashboardProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [scriptUpdates, setScriptUpdates] = useState<ScriptUpdate[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [scriptAccess, setScriptAccess] = useState<ScriptAccess | undefined>();
  const [stats, setStats] = useState({ totalMembers: 0, activeMembers: 0, inactiveMembers: 0, averageParticipation: 0 });
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [claimForm, setClaimForm] = useState({ email: '', password: '', scriptId: '' });
  const [claimError, setClaimError] = useState('');
  const [claimSuccess, setClaimSuccess] = useState('');
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.initialize();
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.filter(a => a.active).length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [announcements]);

  const loadData = () => {
    setAnnouncements(store.getAnnouncements().filter(a => a.active));
    setGroups(store.getGroups());
    setProjects(store.getProjects());
    setScriptUpdates(store.getScriptUpdates().filter(s => s.active));
    setMembers(store.getUsers());
    setStats(store.getStats());
    setScriptAccess(store.getUserScriptAccess(user.id));
  };

  const handleClaimScript = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimError('');
    setClaimSuccess('');

    const targetUser = store.getUserByEmail(claimForm.email);
    if (!targetUser || targetUser.password !== claimForm.password) {
      setClaimError('Invalid email or password');
      return;
    }

    if (targetUser.id !== user.id) {
      setClaimError('You can only claim scripts for your own account');
      return;
    }

    const script = scriptUpdates.find(s => s.id === claimForm.scriptId);
    if (!script) {
      setClaimError('Script not found');
      return;
    }

    const access = store.claimScript(user.id, script.id);
    setScriptAccess(access);
    setClaimSuccess(`Script claimed successfully! Your API key: ${access.apiKey.slice(0, 20)}...`);
    onNotification();
    loadData();
  };

  const scrollGroups = (direction: 'left' | 'right') => {
    if (groupsRef.current) {
      const scrollAmount = 320;
      groupsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeAnnouncements = announcements.filter(a => a.active);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 noise-bg">
      <div className="max-w-7xl mx-auto">
        {/* Announcement Ticker */}
        <div className="glass-panel p-4 mb-6 overflow-hidden">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-neon-pink flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              {activeAnnouncements.length > 0 ? (
                <p className="text-sm text-white animate-fade-in">
                  {activeAnnouncements[currentAnnouncement]?.text}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No announcements</p>
              )}
            </div>
            {activeAnnouncements.length > 1 && (
              <div className="flex gap-1">
                {activeAnnouncements.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === currentAnnouncement ? 'bg-neon-pink' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Groups Carousel */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-neon-pink" />
                  Our Communities
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => scrollGroups('left')} className="p-2 rounded-lg hover:bg-white/5">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollGroups('right')} className="p-2 rounded-lg hover:bg-white/5">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div 
                ref={groupsRef}
                className="flex gap-4 overflow-x-auto scrollbar-thin pb-2"
              >
                {groups.map((group) => (
                  <a
                    key={group.id}
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-72 group"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-white">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.membersCount.toLocaleString()} members</p>
                      </div>
                      <div className="absolute top-2 right-2 p-2 rounded-lg bg-green-500/20">
                        <ExternalLink className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Stats Charts */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-panel p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Member Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Members</span>
                    <span className="text-lg font-bold text-white">{stats.totalMembers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-400">{stats.activeMembers}</span>
                      <CircularProgress value={(stats.activeMembers / Math.max(stats.totalMembers, 1)) * 100} size={32} strokeWidth={3} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Inactive</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-yellow-400">{stats.inactiveMembers}</span>
                      <CircularProgress value={(stats.inactiveMembers / Math.max(stats.totalMembers, 1)) * 100} size={32} strokeWidth={3} color="#fbbf24" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  Participation
                </h3>
                <div className="flex items-center justify-center">
                  <CircularProgress value={stats.averageParticipation} size={100} strokeWidth={8} />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Average participation rate
                </p>
              </div>
            </div>

            {/* TradingView Widget */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neon-pink" />
                Live Market
              </h2>
              <div className="rounded-xl overflow-hidden bg-black/50">
                <iframe
                  src="https://s.tradingview.com/embed-widget/advanced-chart/?symbol=EURUSD&interval=60&theme=dark&style=1&locale=en&toolbar_bg=f1f3f6&enable_publishing=false&hide_top_toolbar=false&hide_legend=false&save_image=false&calendar=false&hide_volume=false&studies=[]"
                  style={{ width: '100%', height: '400px', border: 'none' }}
                  title="TradingView"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div className="glass-panel p-6">
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-white/5 mb-4">
                <TabsTrigger value="members" className="text-xs data-[state=active]:bg-neon-pink/20">
                  <Users className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Members</span>
                </TabsTrigger>
                <TabsTrigger value="records" className="text-xs data-[state=active]:bg-neon-pink/20">
                  <Activity className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Records</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-xs data-[state=active]:bg-neon-pink/20">
                  <BarChart3 className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="script" className="text-xs data-[state=active]:bg-neon-pink/20">
                  <Lock className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Script</span>
                </TabsTrigger>
              </TabsList>

              {/* Members Tab */}
              <TabsContent value="members" className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Member Status</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin">
                  {members.map((member) => (
                    <div key={member.id} className="glass-card p-3 flex items-center gap-3">
                      <Avatar className="w-10 h-10 rounded-lg">
                        <AvatarImage src={member.profilePic} className="rounded-lg" />
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple text-xs">
                          {member.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{member.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircularProgress value={member.participationPct} size={36} strokeWidth={3} />
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${member.isActive ? 'border-green-500 text-green-400' : 'border-yellow-500 text-yellow-400'}`}
                        >
                          {member.isActive ? 'Active' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Records Tab */}
              <TabsContent value="records" className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Membership Records</h3>
                <div className="space-y-3">
                  {groups.map((group) => (
                    <div key={group.id} className="glass-card p-4">
                      <div className="flex items-start gap-3">
                        <img src={group.image} alt={group.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{group.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Owner: {group.owner} • {group.membersCount} members
                          </p>
                          {group.subAdmins && group.subAdmins.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Sub-admins: {group.subAdmins.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Records</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin">
                  {projects.map((project) => (
                    <div key={project.id} className="glass-card p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white">{project.title}</h4>
                        <CircularProgress value={project.assurancePct} size={32} strokeWidth={3} />
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {project.month}
                        </p>
                        <p className="text-muted-foreground">
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          {project.successCount} successes
                        </p>
                        <p className="text-green-400 text-xs">
                          Top: {project.topAchievement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Script Tab */}
              <TabsContent value="script" className="space-y-4">
                {scriptAccess ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Unlock className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-green-400">Script Access Granted</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        API Key: {scriptAccess.apiKey.slice(0, 30)}...
                      </p>
                    </div>
                    
                    <h3 className="text-sm font-medium text-muted-foreground">Available Scripts</h3>
                    <div className="space-y-3">
                      {scriptUpdates.map((update) => (
                        <div key={update.id} className="glass-card p-4">
                          <h4 className="font-medium text-white mb-1">{update.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{update.description}</p>
                          {update.fileLink && (
                            <a
                              href={update.fileLink}
                              className="inline-flex items-center gap-2 text-sm text-neon-pink hover:underline"
                            >
                              <Download className="w-4 h-4" />
                              Download Script
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-5 h-5 text-yellow-400" />
                        <span className="font-medium text-yellow-400">Script Access Required</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Link your account to access premium scripts and updates.
                      </p>
                    </div>

                    <form onSubmit={handleClaimScript} className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        value={claimForm.email}
                        onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
                        className="input-glass"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Your password"
                        value={claimForm.password}
                        onChange={(e) => setClaimForm({ ...claimForm, password: e.target.value })}
                        className="input-glass"
                        required
                      />
                      <select
                        value={claimForm.scriptId}
                        onChange={(e) => setClaimForm({ ...claimForm, scriptId: e.target.value })}
                        className="input-glass"
                        required
                      >
                        <option value="">Select a script</option>
                        {scriptUpdates.map((script) => (
                          <option key={script.id} value={script.id}>{script.title}</option>
                        ))}
                      </select>
                      
                      {claimError && (
                        <p className="text-sm text-red-400">{claimError}</p>
                      )}
                      {claimSuccess && (
                        <p className="text-sm text-green-400">{claimSuccess}</p>
                      )}
                      
                      <button type="submit" className="w-full btn-primary">
                        Claim Script Access
                      </button>
                    </form>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

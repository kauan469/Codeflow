const { useState, useEffect, useRef } = React;

window.GLOBAL_IS_MUTED = true;
window.IS_ADMIN = false;

// ==========================================
// 🎨 SISTEMA DE ÍCONES (VETORES PUROS REACT)
// ==========================================
const ICONS = {
    play: <polygon points="5 3 19 12 5 21 5 3"/>,
    x: <g><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></g>,
    send: <g><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></g>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    msg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    eye: <g><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></g>,
    volX: <g><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></g>,
    volUp: <g><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></g>,
    home: <g><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></g>,
    search: <g><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></g>,
    plus: <g><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></g>,
    bytes: <g><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></g>,
    user: <g><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>,
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>,
    link: <g><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></g>,
    out: <g><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></g>,
    edit: <g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></g>,
    trash: <g><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></g>,
    img: <g><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></g>,
    code: <g><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></g>,
    map: <g><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></g>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    linkedin: <g><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></g>,
    verifOfficial: <path fillRule="evenodd" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.736 2.76 1.83 3.45-.054.26-.082.53-.082.8 0 2.21 1.71 4 3.918 4 .64 0 1.24-.16 1.78-.44.66 1.13 1.86 1.89 3.25 1.89s2.59-.76 3.25-1.89c.54.28 1.14.44 1.78.44 2.21 0 3.918-1.79 3.918-4 0-.27-.028-.54-.082-.8 1.094-.69 1.83-1.99 1.83-3.45zm-10.73 4.1l-4.5-4.7 1.46-1.4 2.94 3.1L16.2 8l1.53 1.3-9.16 9.8z" clipRule="evenodd" />,
    cog: <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />,
    terminalSolid: <g><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06-1.06L10.94 10 6.22 5.28a.75.75 0 0 1 0-1.06Zm11.56 0a.75.75 0 0 1 0 1.06L13.06 10l4.72 4.72a.75.75 0 0 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" /></g>,
    bolt: <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />,
    starSolid: <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />,
    sparkles: <g><path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" /></g>,
    fire: <g><path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" /></g>
};

const Icon = ({ n, c, fill, solid }) => {
    const isFilled = fill && fill !== "none";
    return (
        <svg viewBox="0 0 24 24" 
             fill={solid ? "currentColor" : (fill || "none")} 
             stroke={solid ? "none" : "currentColor"} 
             strokeWidth={solid || isFilled ? "0" : "2"} 
             strokeLinecap="round" strokeLinejoin="round" 
             className={c}>
            {ICONS[n]}
        </svg>
    );
};

// ==========================================
// 🚀 CONEXÃO SUPABASE & API
// ==========================================
const supabase = window.supabase.createClient('https://pqibpdykwbzcnjcxtcsd.supabase.co', 'sb_publishable_Ch-ZarzmHxWtp6TMlEQ5ZA_xINexc_3');
let CURRENT_USER_ID = null;

const api = {
    checkSession: async () => { 
        const { data: { session } } = await supabase.auth.getSession(); 
        if (session) { CURRENT_USER_ID = session.user.id; window.IS_ADMIN = session.user.email === 'nobelinpx62@gmail.com'; }
        return session; 
    },
    login: async (email, password) => { 
        const { data, error } = await supabase.auth.signInWithPassword({ email, password }); 
        if (error) throw error; CURRENT_USER_ID = data.user.id; window.IS_ADMIN = data.user.email === 'nobelinpx62@gmail.com'; return data.user; 
    },
    register: async (email, password, name, username) => {
        const { data, error } = await supabase.auth.signUp({ email, password }); if (error) throw error; 
        CURRENT_USER_ID = data.user.id; window.IS_ADMIN = data.user.email === 'nobelinpx62@gmail.com';
        
        let initialTag = null; let initialVerif = null;
        if (window.IS_ADMIN) { initialTag = 'GoatDevProgrammer'; initialVerif = 'green'; }

        await supabase.from('users').insert([{ id: data.user.id, name, username, email, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s+/g, '')}`, bio: 'Novo na CodeFlow!', followers: 0, following: 0, dev_tag: initialTag, verified_color: initialVerif }]); return data.user;
    },
    logout: async () => { await supabase.auth.signOut(); CURRENT_USER_ID = null; window.IS_ADMIN = false; },
    getUser: async (id) => { const { data } = await supabase.from('users').select('*').eq('id', id).single(); return data; },
    getAllUsers: async () => { const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false }); return data || []; },
    updateUser: async (id, updates) => { await supabase.from('users').update(updates).eq('id', id); },
    deletePost: async (id) => { await supabase.from('posts').delete().eq('id', id); },
    uploadMedia: async (file, folderPath) => {
        if (!file) return null; const filePath = `${folderPath}/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from('media').upload(filePath, file); if (error) throw error;
        return supabase.storage.from('media').getPublicUrl(filePath).data.publicUrl;
    },
    recordView: async (postId) => {
        if (!CURRENT_USER_ID) return;
        try { await supabase.from('post_views').insert([{ post_id: postId, user_id: CURRENT_USER_ID }]); } 
        catch (e) { /* Falha silenciosa para duplicatas bloqueadas pela Primary Key */ }
    },
    toggleFollow: async (targetId) => {
        const { data } = await supabase.from('follows').select('*').eq('follower_id', CURRENT_USER_ID).eq('following_id', targetId);
        if (data && data.length > 0) { await supabase.from('follows').delete().eq('follower_id', CURRENT_USER_ID).eq('following_id', targetId); return false; } 
        else { await supabase.from('follows').insert([{ follower_id: CURRENT_USER_ID, following_id: targetId }]); return true; }
    },
    getFollowStatus: async (targetId) => {
        const { data } = await supabase.from('follows').select('*').eq('follower_id', CURRENT_USER_ID).eq('following_id', targetId); return data && data.length > 0;
    },
    getProfileStats: async (userId) => {
        const { data: followers } = await supabase.from('follows').select('follower_id').eq('following_id', userId);
        const { data: following } = await supabase.from('follows').select('following_id').eq('follower_id', userId);
        const { data: posts } = await supabase.from('posts').select('id, likes(user_id), views:post_views(user_id)').eq('author_id', userId);
        
        let totalLikes = 0; let totalViews = 0;
        if (posts) { posts.forEach(p => { totalLikes += p.likes ? p.likes.length : 0; totalViews += p.views ? p.views.length : 0; }); }
        return { followers: followers ? followers.length : 0, following: following ? following.length : 0, totalLikes, totalViews };
    },
    // AMBOS OS FEEDS AGORA SÃO RANDOMIZADOS PARA DAR AQUELE EFEITO FOR YOU PAGE
    getFeed: async (type = 'post') => {
        const { data, error } = await supabase.from('posts')
            .select(`*, author:users!posts_author_id_fkey(*), files:post_files(*), comments(*, author:users(*)), likes(user_id), views:post_views(user_id)`)
            .eq('type', type).order('created_at', { ascending: false }); 
        
        if (error) { console.error(error); alert("ERRO NO BANCO: O App não achou as tabelas de Views e Follows! Acesse o SQL Editor do Supabase e rode o script."); }
        
        // Randomiza tudo que vem do servidor (Bytes e Posts) para o Feed
        if (data) return data.sort(() => Math.random() - 0.5);
        return [];
    },
    getUserPosts: async (userId, type = 'post') => {
        const { data } = await supabase.from('posts')
            .select(`*, author:users!posts_author_id_fkey(*), files:post_files(*), comments(*, author:users(*)), likes(user_id), views:post_views(user_id)`)
            .eq('author_id', userId).eq('type', type).order('created_at', { ascending: false }); 
        return data || [];
    },
    createPost: async (postData) => {
        const { files, mediaFile, ...postInfo } = postData;
        if (mediaFile) postInfo.media_url = await api.uploadMedia(mediaFile, 'posts');
        const { data: newPost, error } = await supabase.from('posts').insert([postInfo]).select().single(); if (error) throw error;
        if (files && files.length > 0) { await supabase.from('post_files').insert(files.map(f => ({ post_id: newPost.id, name: f.name, ext: f.ext, content: f.content }))); } 
        return newPost;
    },
    addComment: async (postId, text) => {
        const { data } = await supabase.from('comments').insert([{ post_id: postId, author_id: CURRENT_USER_ID, text }]).select('*, author:users(*)').single(); return data;
    },
    toggleLike: async (postId) => {
        const { data: existing } = await supabase.from('likes').select('*').eq('post_id', postId).eq('user_id', CURRENT_USER_ID);
        if (existing && existing.length > 0) { await supabase.from('likes').delete().eq('id', existing[0].id); return false; } 
        else { await supabase.from('likes').insert([{ post_id: postId, user_id: CURRENT_USER_ID }]); return true; }
    },
    search: async (query) => {
        const q = `%${query}%`;
        const { data: users } = await supabase.from('users').select('*').ilike('name', q);
        const { data: posts } = await supabase.from('posts')
            .select(`*, author:users!posts_author_id_fkey(*), files:post_files(*), comments(*, author:users(*)), likes(user_id)`)
            .ilike('content', q);
        return { users: users || [], posts: posts || [] };
    }
};

// ==========================================
// 💎 SISTEMA DE BADGES
// ==========================================
const UserBadges = ({ user }) => {
    if (!user) return null;
    const verifiedColors = { 'green': 'text-[#00ba7c]', 'blue': 'text-[#1da1f2]', 'gold': 'text-[#f9aa11]' };
    const tagStyles = {
        'MicroDev': { icon: 'cog', color: 'text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]' },
        'MacroDev': { icon: 'terminalSolid', color: 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' },
        'ProDev': { icon: 'bolt', color: 'text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' },
        'MasterDev': { icon: 'starSolid', color: 'text-warning drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' },
        'MegaDev Programmer': { icon: 'sparkles', color: 'text-cyan-300 drop-shadow-[0_0_10px_rgba(103,232,249,0.8)]' },
        'GoatDevProgrammer': { icon: 'fire', color: 'text-error drop-shadow-[0_0_15px_rgba(239,68,68,1)]' }
    };

    return (
        <div className="flex items-center gap-1 ml-1 relative top-[1px]">
            {user.verified_color && verifiedColors[user.verified_color] && (
                <div className={`${verifiedColors[user.verified_color]} drop-shadow-md flex items-center justify-center`} title="Verificado">
                    <Icon n="verifOfficial" solid={true} c="w-[18px] h-[18px]" />
                </div>
            )}
            {user.dev_tag && tagStyles[user.dev_tag] && (
                <div title={user.dev_tag} className={`${tagStyles[user.dev_tag].color}`}>
                    <Icon n={tagStyles[user.dev_tag].icon} solid={true} c="w-[18px] h-[18px]" />
                </div>
            )}
        </div>
    );
};

// ==========================================
// 🔐 TELA DE LOGIN E COMPONENTES
// ==========================================
const AuthView = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
    const [name, setName] = useState(''); const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false); const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setErrorMsg('');
        try { if (isLogin) await api.login(email, password); else await api.register(email, password, name, username); onAuthSuccess(); } 
        catch (error) { setErrorMsg(error.message || 'Ocorreu um erro.'); } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-neonBlue/30 shadow-2xl animate-fade-in">
                <div className="flex justify-center mb-6"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neonBlue to-neonPurple flex items-center justify-center font-bold text-white shadow-lg text-xl">CF</div></div>
                <h2 className="text-2xl font-bold text-center mb-2 text-gradient">{isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
                <p className="text-center text-sm text-gray-400 mb-6">A rede social onde projetos evoluem.</p>
                {errorMsg && <div className="bg-error/10 border border-error/50 text-error text-sm p-3 rounded-lg mb-4 text-center">{errorMsg}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (<>
                        <input required type="text" placeholder="Seu Nome Completo" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-secondary/80 border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:border-neonBlue" />
                        <input required type="text" placeholder="Nome de usuário (ex: kauedev)" value={username} onChange={e=>setUsername(e.target.value)} className="w-full bg-secondary/80 border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:border-neonBlue" />
                    </>)}
                    <input required type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-secondary/80 border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:border-neonBlue" />
                    <input required type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-secondary/80 border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:border-neonBlue" />
                    <button type="submit" disabled={loading} className="w-full py-3 h-12 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center">
                        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (isLogin ? 'Entrar na CodeFlow' : 'Cadastrar')}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-400 mt-6 cursor-pointer hover:text-white" onClick={() => {setIsLogin(!isLogin); setErrorMsg('');}}>{isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}</p>
            </div>
        </div>
    );
};

const Header = ({ navigate }) => {
    const [user, setUser] = useState(null);
    useEffect(() => { api.getUser(CURRENT_USER_ID).then(setUser); }, []);
    return (
        <header className="fixed top-0 left-0 w-full glass z-40 px-4 py-3 flex justify-between items-center border-b-0 rounded-none rounded-b-2xl">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('feed')}><div className="w-8 h-8 rounded bg-gradient-to-br from-neonBlue to-neonPurple flex items-center justify-center font-bold text-white shadow-lg">CF</div><h1 className="text-xl font-bold text-gradient tracking-tight">CodeFlow</h1></div>
            <div className="flex items-center gap-4">
                {window.IS_ADMIN && <button onClick={() => navigate('admin')} className="text-warning hover:text-white transition-colors" title="Root Panel"><Icon n="shield" c="w-5 h-5"/></button>}
                <button onClick={async () => { await api.logout(); window.location.reload(); }} className="text-gray-400 hover:text-error"><Icon n="out" c="w-5 h-5"/></button>
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-neonBlue overflow-hidden cursor-pointer" onClick={() => navigate('profile', { userId: CURRENT_USER_ID })}><img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=Kaue`} className="w-full h-full object-cover bg-black" /></div>
            </div>
        </header>
    );
};

const CodeRunnerModal = ({ files, onClose }) => {
    const htmlFile = files.find(f => f.ext === 'html')?.content || '<div style="color:white; padding: 20px; font-family: sans-serif;">Nenhum HTML!</div>';
    const cssFile = files.find(f => f.ext === 'css')?.content || ''; const jsFile = files.find(f => f.ext === 'js')?.content || '';
    const compiledCode = `<!DOCTYPE html><html><head><style>body{background-color:#0f172a;margin:0;} ${cssFile}</style></head><body>${htmlFile}<script>${jsFile}</script></body></html>`;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999999] flex items-center justify-center p-4 animate-fade-in">
            <div className="glass-panel w-full max-w-md h-[80vh] flex flex-col rounded-2xl overflow-hidden border border-neonBlue/50">
                <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-900/80">
                    <span className="text-sm font-bold flex items-center gap-2 text-neonBlue"><Icon n="play" c="w-4 h-4"/> Executando Projeto</span>
                    <button onClick={onClose} className="text-gray-400 hover:text-white p-1"><Icon n="x" c="w-5 h-5"/></button>
                </div>
                <div className="flex-1 bg-white"><iframe srcDoc={compiledCode} className="w-full h-full border-none bg-white" sandbox="allow-scripts allow-same-origin" /></div>
            </div>
        </div>, document.body
    );
};

const CommentsModal = ({ post, onClose, onCommentAdded }) => {
    const [text, setText] = useState(''); const [comments, setComments] = useState(post.comments || []);
    const [sending, setSending] = useState(false); const messagesEndRef = useRef(null);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [comments]); 
    const handleSend = async () => {
        if (!text.trim() || sending) return; setSending(true);
        try { const nc = await api.addComment(post.id, text); setComments([...comments, nc]); setText(''); onCommentAdded(nc); } 
        catch (e) { alert("Erro ao enviar"); } finally { setSending(false); }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[999999] flex flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-h-[85vh] h-full flex flex-col bg-[#050816] rounded-t-[2rem] border-t border-gray-800 animate-slide-up">
                <div className="w-full flex justify-center pt-3 pb-1 bg-secondary/80 rounded-t-[2rem] shrink-0 cursor-pointer" onClick={onClose}><div className="w-12 h-1.5 bg-gray-600 rounded-full"></div></div>
                <div className="px-5 pb-4 pt-1 border-b border-gray-800 flex justify-between items-center bg-secondary/80 shrink-0">
                    <h3 className="font-bold text-white text-lg">Comentários <span className="text-gray-500 text-sm ml-1">({comments.length})</span></h3>
                    <button onClick={onClose} className="bg-gray-800 p-1.5 rounded-full hover:bg-gray-700 transition"><Icon n="x" c="w-5 h-5 text-gray-300"/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#050816]">
                    {comments.length === 0 ? <p className="text-gray-500 text-center text-sm pt-10">Inicie a conversa!</p> : null}
                    {comments.map((c, i) => (
                        <div key={i} className="flex gap-3 items-start animate-fade-in">
                            <div className="w-9 h-9 rounded-full bg-secondary border border-gray-700 overflow-hidden shrink-0 shadow-sm"><img src={c.author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.author?.username}`} className="w-full h-full object-cover bg-black" /></div>
                            <div className="bg-secondary/60 border border-gray-800 rounded-2xl rounded-tl-sm p-3.5 text-sm text-gray-200 w-full break-words shadow-sm">
                                <span className="font-bold flex items-center gap-1 text-neonBlue text-xs mb-1">@{c.author?.username} <UserBadges user={c.author} /></span>
                                <span className="whitespace-pre-wrap leading-relaxed">{c.text}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} className="h-4"></div>
                </div>
                <div className="p-4 border-t border-gray-800 bg-secondary/90 shrink-0 z-10 mb-safe">
                    <div className="flex gap-2">
                        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Escreva um comentário..." className="flex-1 bg-[#050816] border border-gray-700 rounded-full px-5 py-3 text-sm text-white focus:border-neonBlue outline-none shadow-inner" />
                        <button onClick={handleSend} disabled={sending} className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-neonBlue to-neonPurple flex items-center justify-center text-white disabled:opacity-50 hover:scale-105">
                            {sending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Icon n="send" c="w-5 h-5 ml-0.5"/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>, document.body
    );
};

// ==========================================
// 🃏 CARD DO POST
// ==========================================
const PostCard = ({ post, navigate, onDeleted }) => {
    const [showRunner, setShowRunner] = useState(false); const [showComments, setShowComments] = useState(false);
    const [commentCount, setCommentCount] = useState(post.comments?.length || 0);
    const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
    const [isLiked, setIsLiked] = useState(post.likes?.some(l => l.user_id === CURRENT_USER_ID) || false);

    const author = post.author; 
    const canDelete = author?.id === CURRENT_USER_ID || window.IS_ADMIN;

    useEffect(() => { api.recordView(post.id); }, [post.id]);

    if (!author) return null;
    const handleDelete = async () => { if(window.confirm("Certeza que deseja excluir?")) { await api.deletePost(post.id); if(onDeleted) onDeleted(post.id); } };
    const handleLike = async () => { setIsLiked(!isLiked); setLikesCount(isLiked ? likesCount - 1 : likesCount + 1); try { await api.toggleLike(post.id); } catch (e) { setIsLiked(isLiked); setLikesCount(likesCount); } };
    const tagsArray = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    return (
        <div className="glass p-5 mb-5 border border-gray-800 shadow-xl relative z-10">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('profile', { userId: author.id })}>
                    <div className="w-10 h-10 rounded-full bg-secondary border border-gray-600 overflow-hidden shadow-sm"><img src={author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.username}`} className="w-full h-full object-cover bg-black" /></div>
                    <div>
                        <div className="flex items-center"><h3 className="font-bold text-sm text-textMain leading-tight">{author.name}</h3> <UserBadges user={author} /></div>
                        <p className="text-[11px] text-textMuted">@{author.username}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {post.type === 'post' && post.files?.length > 0 && <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-warning/10 text-warning border border-warning/30">Projeto</span>}
                    {canDelete && <button onClick={handleDelete} className="p-1.5 text-gray-500 hover:bg-error/20 hover:text-error rounded-md transition"><Icon n="trash" c="w-4 h-4"/></button>}
                </div>
            </div>
            
            {post.title && <h2 className="font-bold text-lg text-white mb-2">{post.title}</h2>}
            <p className="text-sm text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>

            {tagsArray.length > 0 && (<div className="flex flex-wrap gap-2 mb-4">{tagsArray.map((tag, i) => <span key={i} className="text-[10px] px-2 py-1 bg-secondary text-neonBlue border border-neonBlue/20 rounded-md">{tag.startsWith('#') ? tag : `#${tag}`}</span>)}</div>)}

            {(post.repo_url || post.demo_url) && (
                <div className="flex gap-3 mb-4">
                    {post.repo_url && <a href={post.repo_url} target="_blank" className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg border border-gray-600"><Icon n="github" c="w-3.5 h-3.5"/> Repo</a>}
                    {post.demo_url && <a href={post.demo_url} target="_blank" className="flex items-center gap-1.5 text-xs bg-neonBlue/10 hover:bg-neonBlue/20 text-neonBlue px-3 py-1.5 rounded-lg border border-neonBlue/30"><Icon n="link" c="w-3.5 h-3.5"/> Demo</a>}
                </div>
            )}

            {post.media_url && post.media_type === 'image' && <img src={post.media_url} className="w-full rounded-xl mb-4 border border-gray-700 object-cover max-h-80 bg-black" />}
            {post.media_url && post.media_type === 'video' && <video src={post.media_url + "#t=0.001"} preload="metadata" controls className="w-full rounded-xl mb-4 border border-gray-700 bg-black max-h-80 object-cover"></video>}

            {post.files && post.files.length > 0 && (
                <div className="mb-4 bg-[#0d1117] border border-gray-700 rounded-xl overflow-hidden shadow-inner">
                    <div className="flex justify-between items-center px-4 py-2 bg-[#161b22] border-b border-gray-700">
                        <div className="flex gap-2 flex-wrap">{post.files.map((f, i) => <span key={i} className="text-[10px] font-mono text-gray-400 bg-gray-800 px-2 py-0.5 rounded border border-gray-700">{f.name}</span>)}</div>
                        <button onClick={() => setShowRunner(true)} className="flex items-center gap-1 text-xs bg-success/10 text-success hover:bg-success/20 px-3 py-1.5 rounded-md font-bold"><Icon n="play" c="w-3.5 h-3.5"/> Executar</button>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-5 border-t border-gray-800/80 pt-4 mt-2">
                <button onClick={handleLike} className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${isLiked ? 'text-pink-500' : 'text-textMuted hover:text-pink-400'}`}>
                    <Icon n="heart" fill={isLiked ? "currentColor" : "none"} c="w-5 h-5"/> {likesCount}
                </button>
                <button onClick={() => setShowComments(true)} className="flex items-center gap-1.5 text-textMuted text-xs font-bold hover:text-neonBlue transition-colors"><Icon n="msg" c="w-5 h-5"/> {commentCount}</button>
                <span className="flex items-center gap-1.5 text-textMuted text-xs font-bold ml-auto"><Icon n="eye" c="w-4 h-4"/> {post.views?.length || 0}</span>
            </div>
            
            {showRunner && <CodeRunnerModal files={post.files} onClose={() => setShowRunner(false)} />}
            {showComments && <CommentsModal post={post} onClose={() => setShowComments(false)} onCommentAdded={() => setCommentCount(c => c + 1)} />}
        </div>
    );
};

// ==========================================
// 📱 CARD DO BYTE
// ==========================================
const ByteCard = ({ byte, navigate, onDeleted }) => {
    const [isLiked, setIsLiked] = useState(byte.likes?.some(l => l.user_id === CURRENT_USER_ID) || false);
    const [likesCount, setLikesCount] = useState(byte.likes?.length || 0);
    const [commentCount, setCommentCount] = useState(byte.comments?.length || 0);
    const [showRunner, setShowRunner] = useState(false);
    const [showComments, setShowComments] = useState(false);
    
    const [isMuted, setIsMuted] = useState(window.GLOBAL_IS_MUTED);
    const [showVolumeAnim, setShowVolumeAnim] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const videoRef = useRef(null); const containerRef = useRef(null); const clickTimeoutRef = useRef(null); const viewedRef = useRef(false);
    const author = byte.author;
    const canDelete = author?.id === CURRENT_USER_ID || window.IS_ADMIN;

    useEffect(() => {
        const handler = () => setIsMuted(window.GLOBAL_IS_MUTED); window.addEventListener('muteChange', handler); return () => window.removeEventListener('muteChange', handler);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { 
                    if (videoRef.current) { videoRef.current.play().catch(()=>{}); setIsPlaying(true); }
                    if (!viewedRef.current) { api.recordView(byte.id); viewedRef.current = true; } 
                } 
                else { if (videoRef.current) { videoRef.current.pause(); setIsPlaying(false); } }
            });
        }, { threshold: 0.6 }); 
        if (containerRef.current) observer.observe(containerRef.current); return () => { if (containerRef.current) observer.unobserve(containerRef.current); };
    }, []);

    const handleVideoTouch = (e) => {
        e.stopPropagation();
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current); clickTimeoutRef.current = null;
            window.GLOBAL_IS_MUTED = !window.GLOBAL_IS_MUTED; setIsMuted(window.GLOBAL_IS_MUTED); window.dispatchEvent(new Event('muteChange'));
            setShowVolumeAnim(true); setTimeout(() => setShowVolumeAnim(false), 800);
        } else {
            clickTimeoutRef.current = setTimeout(() => {
                clickTimeoutRef.current = null;
                if (videoRef.current) { if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); } else { videoRef.current.play(); setIsPlaying(true); } }
            }, 300);
        }
    };

    const handleLike = async () => { setIsLiked(!isLiked); setLikesCount(isLiked ? likesCount - 1 : likesCount + 1); try { await api.toggleLike(byte.id); } catch (e) { setIsLiked(isLiked); setLikesCount(likesCount); } };
    const handleDelete = async () => { if(window.confirm("Certeza que deseja excluir?")) { await api.deletePost(byte.id); if(onDeleted) onDeleted(byte.id); } };

    return (
        <div ref={containerRef} className="relative w-full h-screen snap-start snap-always bg-black flex items-center justify-center overflow-hidden">
            {byte.media_type === 'video' ? (
                <div className="absolute inset-0 w-full h-full cursor-pointer bg-black" onClick={handleVideoTouch}>
                    <video ref={videoRef} src={byte.media_url + "#t=0.001"} preload="metadata" className="w-full h-full object-cover opacity-90 bg-black" loop muted={isMuted} playsInline />
                    {!isPlaying && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 p-5 rounded-full text-white pointer-events-none z-30"><Icon n="play" fill="currentColor" c="w-10 h-10 ml-1"/></div>)}
                    {showVolumeAnim && (<div className="animate-pop-in-out bg-black/50 backdrop-blur-md p-6 rounded-full text-white z-40 pointer-events-none"><Icon n={isMuted ? "volX" : "volUp"} c="w-12 h-12"/></div>)}
                </div>
            ) : byte.media_type === 'image' ? (<img src={byte.media_url} className="absolute inset-0 w-full h-full object-cover opacity-60 bg-black" />
            ) : (<div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center opacity-80 font-mono text-neonBlue/20 text-4xl p-10 text-center break-words">{byte.title || 'CodeFlow'}</div>)}
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none z-10"></div>
            {byte.files?.length > 0 && (<button onClick={() => setShowRunner(true)} className="absolute z-30 w-20 h-20 rounded-full bg-success/20 backdrop-blur-md flex flex-col items-center justify-center border border-success/50 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:scale-110"><Icon n="play" c="w-8 h-8 ml-1 mb-1 text-success"/><span className="text-[9px] font-bold uppercase tracking-wider">Executar</span></button>)}

            <div className="absolute top-20 right-4 z-40 flex flex-col gap-3 pointer-events-auto">
                {canDelete && <button onClick={handleDelete} className="bg-black/60 p-2.5 rounded-full text-white hover:text-error border border-white/20"><Icon n="trash" c="w-5 h-5"/></button>}
            </div>

            <div className="absolute bottom-24 left-4 right-20 z-30 pointer-events-auto">
                <div className="font-bold text-white text-lg flex items-center gap-1 mb-2 shadow-black drop-shadow-md cursor-pointer" onClick={() => navigate('profile', { userId: author.id })}>
                    @{author.username} <UserBadges user={author} />
                </div>
                {byte.title && <h4 className="font-bold text-neonPurple text-sm drop-shadow-md">{byte.title}</h4>}
                <p className="text-gray-100 text-sm mb-1 drop-shadow-md">{byte.content}</p>
            </div>

            <div className="absolute bottom-24 right-4 z-30 flex flex-col items-center gap-6 pointer-events-auto">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-secondary shadow-lg cursor-pointer" onClick={() => navigate('profile', { userId: author.id })}><img src={author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author?.username}`} className="w-full h-full object-cover bg-black" /></div>
                <button onClick={handleLike} className={`relative flex flex-col items-center p-2 rounded-full bg-black/20 backdrop-blur-sm transition-colors drop-shadow-md ${isLiked ? 'text-pink-500' : 'text-white hover:text-pink-400'}`}><Icon n="heart" fill={isLiked ? "currentColor" : "none"} c="w-8 h-8 mb-1"/><span className="text-xs font-bold shadow-black drop-shadow-lg">{likesCount}</span></button>
                <button onClick={() => setShowComments(true)} className="relative flex flex-col items-center p-2 rounded-full bg-black/20 backdrop-blur-sm text-white drop-shadow-md hover:text-neonBlue transition-colors"><Icon n="msg" c="w-8 h-8 mb-1"/><span className="text-xs font-bold shadow-black drop-shadow-lg">{commentCount}</span></button>
                <div className="relative flex flex-col items-center p-2 rounded-full bg-black/20 backdrop-blur-sm text-white drop-shadow-md"><Icon n="eye" c="w-6 h-6 mb-1 text-gray-300"/><span className="text-[10px] font-bold shadow-black drop-shadow-lg text-gray-300">{byte.views?.length || 0}</span></div>
            </div>

            {showRunner && <CodeRunnerModal files={byte.files} onClose={() => setShowRunner(false)} />}
            {showComments && <CommentsModal post={byte} onClose={() => setShowComments(false)} onCommentAdded={() => setCommentCount(c=>c+1)} />}
        </div>
    );
};

// ==========================================
// 🛠️ ADMIN PANEL
// ==========================================
const AdminView = ({ navigate }) => {
    const [users, setUsers] = useState([]); const [posts, setPosts] = useState([]);
    const [tab, setTab] = useState('users');

    useEffect(() => {
        if (!window.IS_ADMIN) { navigate('feed'); return; }
        api.getAllUsers().then(setUsers);
        api.getFeed('post').then(p1 => api.getFeed('byte').then(p2 => setPosts([...p1, ...p2])));
    }, []);

    const handleUpdateTag = async (userId, tag) => { await api.updateUser(userId, { dev_tag: tag || null }); setUsers(users.map(u => u.id === userId ? {...u, dev_tag: tag} : u)); };
    const handleUpdateVerif = async (userId, color) => { await api.updateUser(userId, { verified_color: color || null }); setUsers(users.map(u => u.id === userId ? {...u, verified_color: color} : u)); };
    const handleDeletePost = async (id) => { if(window.confirm("Excluir post?")) { await api.deletePost(id); setPosts(posts.filter(p=>p.id!==id)); } };

    return (
        <div className="animate-fade-in mt-2 pb-10">
            <div className="glass p-4 mb-4 flex items-center gap-3 border-error/50">
                <Icon n="shield" c="w-8 h-8 text-error" />
                <div><h2 className="text-xl font-bold text-white">Root Panel</h2><p className="text-xs text-gray-400">Controle absoluto.</p></div>
            </div>
            
            <div className="flex gap-2 mb-4">
                <button onClick={()=>setTab('users')} className={`flex-1 py-2 font-bold rounded-lg text-sm ${tab==='users'?'bg-neonBlue text-white':'bg-gray-800 text-gray-400'}`}>Usuários</button>
                <button onClick={()=>setTab('posts')} className={`flex-1 py-2 font-bold rounded-lg text-sm ${tab==='posts'?'bg-error text-white':'bg-gray-800 text-gray-400'}`}>Posts & Bytes</button>
            </div>

            {tab === 'users' && users.map(u => (
                <div key={u.id} className="glass p-4 mb-3 border border-gray-800 text-sm">
                    <div className="flex justify-between items-center mb-3">
                        <div><div className="font-bold text-white flex items-center gap-1">{u.name} <UserBadges user={u}/></div><p className="text-xs text-gray-400">@{u.username} | {u.email}</p></div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <select value={u.verified_color || ''} onChange={e=>handleUpdateVerif(u.id, e.target.value)} className="bg-gray-800 border border-gray-700 text-white rounded p-1 text-xs outline-none">
                            <option value="">Sem Verificado</option><option value="green">Verde</option><option value="blue">Azul</option><option value="gold">Dourado</option>
                        </select>
                        <select value={u.dev_tag || ''} onChange={e=>handleUpdateTag(u.id, e.target.value)} className="bg-gray-800 border border-gray-700 text-white rounded p-1 text-xs outline-none">
                            <option value="">Sem Tag</option>
                            <option value="MicroDev">1. MicroDev</option><option value="MacroDev">2. MacroDev</option><option value="ProDev">3. ProDev</option><option value="MasterDev">4. MasterDev</option><option value="MegaDev Programmer">5. MegaDev</option><option value="GoatDevProgrammer">6. GoatDev</option>
                        </select>
                    </div>
                </div>
            ))}

            {tab === 'posts' && posts.map(p => (
                <div key={p.id} className="glass p-3 mb-2 flex justify-between items-center border border-gray-800 text-sm">
                    <div className="truncate pr-4"><span className="text-xs text-neonPurple font-bold uppercase mr-2">{p.type}</span><span className="text-gray-300">{p.content?.substring(0, 30)}...</span><p className="text-[10px] text-gray-500">@{p.author?.username}</p></div>
                    <button onClick={()=>handleDeletePost(p.id)} className="bg-error/20 p-2 rounded-lg text-error"><Icon n="trash" c="w-4 h-4"/></button>
                </div>
            ))}
        </div>
    );
};

// ==========================================
// 📱 TELAS PRINCIPAIS (VIEWS)
// ==========================================
const BytesView = ({ navigate }) => {
    const [bytes, setBytes] = useState([]); const [loading, setLoading] = useState(true);
    useEffect(() => { api.getFeed('byte').then(data => { setBytes(data); setLoading(false); }); }, []);

    if (loading) return <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-[50]"><div className="w-8 h-8 border-4 border-neonPurple border-t-transparent rounded-full animate-spin"></div></div>;
    if (bytes.length === 0) return (<div className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center text-gray-500 z-30 pb-20"><Icon n="play" c="w-12 h-12 mb-4 text-gray-700"/><h2 className="text-xl font-bold text-white mb-2">Nenhum Byte ainda</h2><button onClick={() => navigate('create')} className="mt-6 px-6 py-2 bg-neonPurple text-white font-bold rounded-full hover:scale-105">Criar Byte</button></div>);
    return (<div className="fixed top-0 left-0 w-full h-screen z-30 bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">{bytes.map(byte => <ByteCard key={byte.id} byte={byte} navigate={navigate} onDeleted={(id)=>setBytes(bytes.filter(b=>b.id!==id))} />)}</div>);
};

const ExploreView = ({ navigate }) => { 
    const [query, setQuery] = useState(""); const [results, setResults] = useState(null);
    const handleSearch = async (e) => { const val = e.target.value; setQuery(val); if (val.length > 2) setResults(await api.search(val)); else setResults(null); };
    return (<div className="animate-fade-in mt-2"><div className="relative mb-6"><div className="absolute left-3 top-3.5 text-gray-500"><Icon n="search" c="w-4 h-4"/></div><input type="text" value={query} onChange={handleSearch} placeholder="Buscar devs, projetos..." className="w-full bg-secondary/80 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neonBlue" /></div>{results && results.users.length > 0 && (<div className="mb-6"><h3 className="text-xs font-bold text-gray-400 mb-3">DEVS ENCONTRADOS</h3>{results.users.map(u => (<div key={u.id} onClick={() => navigate('profile', {userId: u.id})} className="glass p-3 mb-2 flex items-center gap-3 cursor-pointer hover:border-neonBlue"><img src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`} className="w-10 h-10 rounded-full object-cover bg-black" /><div><div className="font-bold text-sm text-white flex items-center gap-1">{u.name} <UserBadges user={u}/></div><p className="text-xs text-gray-400">@{u.username}</p></div></div>))}</div>)}</div>);
};

const ProfileView = ({ navigate, viewParams }) => {
    const userId = viewParams?.userId || CURRENT_USER_ID; const isOwnProfile = userId === CURRENT_USER_ID;
    const [user, setUser] = useState(null); const [posts, setPosts] = useState([]); const [bytes, setBytes] = useState([]); const [activeTab, setActiveTab] = useState('posts');
    const [stats, setStats] = useState({ followers: 0, following: 0, totalLikes: 0, totalViews: 0 });
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => { 
        api.getUser(userId).then(setUser); 
        api.getUserPosts(userId, 'post').then(setPosts); 
        api.getUserPosts(userId, 'byte').then(setBytes);
        api.getProfileStats(userId).then(setStats);
        if (!isOwnProfile) api.getFollowStatus(userId).then(setIsFollowing);
    }, [userId]);

    const handleFollow = async () => {
        setIsFollowing(!isFollowing);
        setStats(prev => ({ ...prev, followers: isFollowing ? prev.followers - 1 : prev.followers + 1 }));
        await api.toggleFollow(userId);
    };

    if (!user) return <div className="text-center mt-20 pt-10"><div className="w-8 h-8 border-4 border-neonBlue border-t-transparent rounded-full animate-spin mx-auto"></div></div>;

    return (
        <div className="animate-fade-in -mx-4 pb-10">
            <div className="relative mb-12">
                <div className="h-32 bg-secondary relative overflow-hidden border-b border-gray-800">
                    {user.cover_url ? <img src={user.cover_url} className="w-full h-full object-cover opacity-60 bg-black" /> : <div className="w-full h-full bg-gradient-to-r from-neonBlue/40 to-neonPurple/40"></div>}
                    {isOwnProfile && <button onClick={() => navigate('editProfile')} className="absolute bottom-2 right-4 bg-black/60 p-2 rounded-full text-white backdrop-blur-sm border border-white/20 z-10"><Icon n="edit" c="w-4 h-4"/></button>}
                </div>
                <div className="absolute -bottom-10 left-4 w-24 h-24 rounded-full border-[4px] border-[#050816] bg-secondary overflow-hidden shadow-xl z-20"><img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-full h-full object-cover bg-black" /></div>
            </div>
            <div className="px-5">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-1"><h2 className="text-2xl font-bold">{user.name}</h2> <UserBadges user={user} /></div>
                        <p className="text-neonBlue text-sm font-medium mb-2">@{user.username}</p>
                    </div>
                    {!isOwnProfile && <button onClick={handleFollow} className={`text-xs font-bold px-4 py-1.5 rounded-full shadow-lg ${isFollowing ? 'bg-gray-800 text-white' : 'bg-neonBlue text-white shadow-neonBlue/30'}`}>{isFollowing ? 'Seguindo' : 'Seguir'}</button>}
                </div>
                <p className="text-sm text-gray-300 mb-4 whitespace-pre-wrap">{user.bio}</p>
                
                <div className="flex gap-3 border-y border-gray-800 py-4 mb-4 justify-between">
                    <div className="text-center flex-1"><span className="block font-bold text-white text-lg">{stats.followers}</span><span className="text-[9px] text-gray-400 uppercase tracking-wider">Seguidores</span></div>
                    <div className="text-center flex-1"><span className="block font-bold text-white text-lg">{stats.following}</span><span className="text-[9px] text-gray-400 uppercase tracking-wider">Seguindo</span></div>
                    <div className="text-center flex-1"><span className="block font-bold text-white text-lg">{stats.totalLikes}</span><span className="text-[9px] text-gray-400 uppercase tracking-wider">Curtidas</span></div>
                    <div className="text-center flex-1"><span className="block font-bold text-white text-lg">{stats.totalViews}</span><span className="text-[9px] text-gray-400 uppercase tracking-wider">Views</span></div>
                </div>

                <div className="flex flex-col gap-2 mt-4 mb-6 text-sm text-gray-400">
                    {user.location && <span className="flex items-center gap-2"><Icon n="map" c="w-4 h-4"/> {user.location}</span>}
                    {user.github && <a href={user.github} target="_blank" className="flex items-center gap-2 hover:text-white"><Icon n="github" c="w-4 h-4"/> GitHub</a>}
                    {user.linkedin && <a href={user.linkedin} target="_blank" className="flex items-center gap-2 hover:text-neonBlue"><Icon n="linkedin" c="w-4 h-4"/> LinkedIn</a>}
                    {user.portfolio && <a href={user.portfolio} target="_blank" className="flex items-center gap-2 hover:text-success"><Icon n="link" c="w-4 h-4"/> Portfólio</a>}
                </div>
                <div className="flex gap-4 mb-4 border-b border-gray-800 mt-6">
                    <button onClick={() => setActiveTab('posts')} className={`pb-2 text-sm font-bold transition-colors ${activeTab === 'posts' ? 'text-neonBlue border-b-2 border-neonBlue' : 'text-gray-500'}`}>Posts ({posts.length})</button>
                    <button onClick={() => setActiveTab('bytes')} className={`pb-2 text-sm font-bold transition-colors ${activeTab === 'bytes' ? 'text-neonPurple border-b-2 border-neonPurple' : 'text-gray-500'}`}>Bytes ({bytes.length})</button>
                </div>
                {activeTab === 'posts' && (posts.length > 0 ? posts.map(p => <PostCard key={p.id} post={p} navigate={navigate} onDeleted={(id)=>setPosts(posts.filter(x=>x.id!==id))} />) : <p className="text-gray-500 text-sm text-center py-5">Nenhum post publicado.</p>)}
                {activeTab === 'bytes' && (<div className="grid grid-cols-2 gap-2">{bytes.length > 0 ? bytes.map(b => (
                    <div key={b.id} onClick={() => navigate('bytes')} className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden cursor-pointer border border-gray-700">
                        {b.media_type === 'video' ? <video src={b.media_url + "#t=0.001"} preload="metadata" className="w-full h-full object-cover opacity-70 bg-black" /> : b.media_type === 'image' ? <img src={b.media_url} className="w-full h-full object-cover opacity-70 bg-black" /> : <div className="p-2 text-[10px] font-mono text-neonBlue break-words h-full flex items-center justify-center text-center bg-black">{b.title || b.content}</div>}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-bold drop-shadow-md"><Icon n="play" c="w-3 h-3"/> {b.likes_count || 0}</div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 text-gray-300 text-[10px] font-bold drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded"><Icon n="eye" c="w-3 h-3"/> {b.views?.length || 0}</div>
                    </div>
                )) : <p className="text-gray-500 text-sm text-center py-5 col-span-2">Nenhum Byte publicado.</p>}</div>)}
            </div>
        </div>
    );
};

const EditProfileView = ({ navigate }) => {
    const [user, setUser] = useState({}); const [saving, setSaving] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null); const [coverFile, setCoverFile] = useState(null);
    const avatarInputRef = useRef(null); const coverInputRef = useRef(null);
    useEffect(() => { api.getUser(CURRENT_USER_ID).then(setUser); }, []);
    
    const handleSave = async () => {
        setSaving(true);
        try {
            let avatarUrl = user.avatar; let coverUrl = user.cover_url;
            if (avatarFile) avatarUrl = await api.uploadMedia(avatarFile, 'avatars');
            if (coverFile) coverUrl = await api.uploadMedia(coverFile, 'covers');
            await api.updateUser(CURRENT_USER_ID, { name: user.name, bio: user.bio, location: user.location, avatar: avatarUrl, cover_url: coverUrl, github: user.github, linkedin: user.linkedin, portfolio: user.portfolio });
            navigate('profile', { userId: CURRENT_USER_ID });
        } catch (e) { alert("Erro ao salvar perfil."); } finally { setSaving(false); }
    };
    return (
        <div className="animate-fade-in mt-2 glass p-5 pb-10">
            <h2 className="text-xl font-bold mb-5 text-gradient">Editar Perfil</h2>
            <div className="space-y-4">
                <div className="p-4 border border-gray-800 rounded-xl bg-gray-900/50 space-y-3">
                    <h3 className="text-sm font-bold text-white mb-2"><Icon n="img" c="w-4 h-4 inline mr-1"/> Fotos</h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-secondary border border-gray-700 overflow-hidden"><img src={avatarFile ? URL.createObjectURL(avatarFile) : (user.avatar || '')} className="w-full h-full object-cover bg-black" /></div>
                        <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} />
                        <button onClick={() => avatarInputRef.current.click()} className="text-xs bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 font-bold hover:text-neonBlue transition">Mudar Avatar</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {coverFile ? <span className="text-xs text-success">Capa selecionada</span> : null}
                        <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={e => setCoverFile(e.target.files[0])} />
                        <button onClick={() => coverInputRef.current.click()} className="text-xs bg-gray-800 px-3 py-2 rounded-lg border border-gray-700 font-bold hover:text-neonPurple w-full text-center transition">Mudar Foto de Capa</button>
                    </div>
                </div>
                <div className="p-4 border border-gray-800 rounded-xl bg-gray-900/50 space-y-3">
                    <h3 className="text-sm font-bold text-white mb-2"><Icon n="user" c="w-4 h-4 inline mr-1"/> Informações</h3>
                    <input type="text" value={user.name || ''} onChange={e=>setUser({...user, name: e.target.value})} className="w-full bg-secondary p-3 rounded-lg text-sm text-white outline-none border border-gray-700 focus:border-neonBlue" placeholder="Nome" />
                    <input type="text" value={user.location || ''} onChange={e=>setUser({...user, location: e.target.value})} className="w-full bg-secondary p-3 rounded-lg text-sm text-white outline-none border border-gray-700 focus:border-neonBlue" placeholder="Localização" />
                    <textarea value={user.bio || ''} onChange={e=>setUser({...user, bio: e.target.value})} className="w-full bg-secondary p-3 rounded-lg text-sm text-white outline-none border border-gray-700 resize-none h-24 focus:border-neonBlue" placeholder="Sua bio..."></textarea>
                </div>
                <div className="p-4 border border-gray-800 rounded-xl bg-gray-900/50 space-y-3">
                    <h3 className="text-sm font-bold text-white mb-2"><Icon n="link" c="w-4 h-4 inline mr-1"/> Links</h3>
                    <input type="text" value={user.github || ''} onChange={e=>setUser({...user, github: e.target.value})} className="w-full bg-secondary p-3 rounded-lg text-sm text-white outline-none border border-gray-700 focus:border-neonBlue" placeholder="GitHub URL" />
                    <input type="text" value={user.linkedin || ''} onChange={e=>setUser({...user, linkedin: e.target.value})} className="w-full bg-secondary p-3 rounded-lg text-sm text-white outline-none border border-gray-700 focus:border-neonBlue" placeholder="LinkedIn URL" />
                    <input type="text" value={user.portfolio || ''} onChange={e=>setUser({...user, portfolio: e.target.value})} className="w-full bg-secondary p-3 rounded-lg text-sm text-white outline-none border border-gray-700 focus:border-neonBlue" placeholder="Portfólio URL" />
                </div>
            </div>
            <div className="mt-6 flex gap-3">
                <button onClick={() => navigate('profile', {userId: CURRENT_USER_ID})} className="flex-1 py-3 rounded-xl bg-gray-800 text-white font-bold">Cancelar</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-3 h-12 rounded-xl bg-neonBlue text-white font-bold shadow-lg shadow-neonBlue/30 flex items-center justify-center disabled:opacity-50">
                    {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Salvar'}
                </button>
            </div>
        </div>
    );
};

const CreateView = ({ navigate }) => {
    const [type, setType] = useState('post');
    const [title, setTitle] = useState(""); const [text, setText] = useState(""); const [tags, setTags] = useState("");
    const [repoUrl, setRepoUrl] = useState(""); const [demoUrl, setDemoUrl] = useState("");
    const [mediaFile, setMediaFile] = useState(null); const [files, setFiles] = useState([]); const [posting, setPosting] = useState(false);
    
    const mediaInputRef = useRef(null); const fileInputRef = useRef(null);
    const handleFilesUpload = async (e) => {
        const selectedFiles = Array.from(e.target.files); const newFiles = [];
        for (let file of selectedFiles) { const fileText = await file.text(); newFiles.push({ name: file.name, ext: file.name.split('.').pop().toLowerCase(), content: fileText }); }
        setFiles(prev => [...prev, ...newFiles]);
    };
    const handleMediaSelection = (e) => { if(e.target.files && e.target.files[0]) setMediaFile(e.target.files[0]); };
    const handlePublish = async () => {
        if (!text && !mediaFile && files.length === 0) return; setPosting(true);
        try {
            await api.createPost({ author_id: CURRENT_USER_ID, type: type, title: title || null, content: text, tags: tags || null, repo_url: repoUrl || null, demo_url: demoUrl || null, media_type: mediaFile ? (mediaFile.type.startsWith('video/') ? 'video' : 'image') : null, mediaFile: mediaFile, files: files });
            navigate(type === 'post' ? 'feed' : 'bytes');
        } catch(e) { alert("Erro ao publicar: " + e.message); setPosting(false); }
    };

    return (
        <div className="animate-fade-in glass p-5 border border-neonBlue/30 mt-2 mb-10">
            <h2 className="text-xl font-bold mb-4 text-gradient">Criar Novo</h2>
            <div className="flex bg-secondary p-1 rounded-xl mb-4 border border-gray-700">
                <button onClick={()=>setType('post')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${type==='post'?'bg-neonBlue text-white':'text-gray-400 hover:text-white'}`}>Post</button>
                <button onClick={()=>setType('byte')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${type==='byte'?'bg-neonPurple text-white':'text-gray-400 hover:text-white'}`}>Byte</button>
            </div>
            <div className="space-y-3 mb-4">
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título (Opcional)" className="w-full bg-secondary border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:border-neonBlue font-bold" />
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={type === 'post' ? "Explique seu projeto, dúvida..." : "Legenda do Byte..."} className="w-full bg-secondary border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-neonBlue resize-none min-h-[100px]"></textarea>
                <input type="text" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (Ex: react, tailwind)" className="w-full bg-secondary border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:border-neonBlue" />
            </div>
            {type === 'post' && (
                <div className="space-y-3 mb-4 p-4 border border-gray-800 rounded-xl bg-gray-900/30">
                    <input type="text" value={repoUrl} onChange={e=>setRepoUrl(e.target.value)} placeholder="Link do GitHub" className="w-full bg-secondary border border-gray-700 rounded-xl p-3 text-xs text-white outline-none focus:border-neonBlue" />
                    <input type="text" value={demoUrl} onChange={e=>setDemoUrl(e.target.value)} placeholder="Link do Site (Demo)" className="w-full bg-secondary border border-gray-700 rounded-xl p-3 text-xs text-white outline-none focus:border-neonBlue" />
                </div>
            )}
            <div className="p-4 border border-gray-800 rounded-xl bg-gray-900/30 mb-4">
                {mediaFile ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-700 mt-2">
                        {mediaFile.type.startsWith('video/') ? <video src={URL.createObjectURL(mediaFile)} className="w-full max-h-40 bg-black" controls /> : <img src={URL.createObjectURL(mediaFile)} className="w-full max-h-40 object-cover bg-black" />}
                        <button onClick={() => setMediaFile(null)} className="absolute top-2 right-2 bg-black/70 p-1.5 rounded-full z-10 hover:text-error"><Icon n="x" c="w-4 h-4 text-white"/></button>
                    </div>
                ) : (<button onClick={() => mediaInputRef.current.click()} className="w-full py-6 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-neonBlue hover:text-neonBlue transition-colors"><span className="text-xs font-bold">Toque para Mídia</span></button>)}
                <input type="file" ref={mediaInputRef} onChange={handleMediaSelection} className="hidden" accept="image/*,video/*" />
            </div>
            {files.length > 0 && (
                <div className="mb-4 p-3 bg-[#0d1117] rounded-xl border border-gray-700">
                    <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-success">Arquivos ({files.length})</span><button onClick={()=>setFiles([])} className="text-gray-400"><Icon n="trash" c="w-4 h-4"/></button></div>
                    <div className="flex flex-wrap gap-2">{files.map((f,i) => <span key={i} className="text-[10px] bg-secondary px-2 py-1 rounded text-neonBlue font-mono">{f.name}</span>)}</div>
                </div>
            )}
            <div className="flex justify-between items-center mt-5">
                <input type="file" ref={fileInputRef} onChange={handleFilesUpload} className="hidden" accept=".html,.js,.css,.txt" multiple />
                <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 px-3 py-2 text-white hover:text-success rounded-lg bg-gray-800 border border-gray-700 shadow-sm"><Icon n="code" c="w-4 h-4 text-success"/> <span className="text-xs font-bold hidden sm:block">Anexar Scripts</span></button>
                <div className="flex gap-2">
                    <button onClick={() => navigate('feed')} className="px-4 py-2 text-sm font-semibold text-gray-400">Cancelar</button>
                    <button onClick={handlePublish} disabled={posting} className="px-5 py-2 h-10 bg-gradient-to-r from-neonBlue to-neonPurple text-white text-sm font-bold rounded-xl shadow-lg flex items-center justify-center disabled:opacity-50">{posting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Publicar'}</button>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 🚀 INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================
const App = () => {
    const [authChecked, setAuthChecked] = useState(false); const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState('feed'); const [viewParams, setViewParams] = useState({});
    const [feedPosts, setFeedPosts] = useState([]); const [loadingFeed, setLoadingFeed] = useState(false);

    useEffect(() => { api.checkSession().then(session => { setIsAuthenticated(!!session); setAuthChecked(true); }); }, []);
    
    useEffect(() => { 
        if (isAuthenticated && view === 'feed') { 
            setLoadingFeed(true); 
            api.getFeed('post').then(posts => { setFeedPosts(posts); setLoadingFeed(false); })
            .catch(error => {
                alert("🚨 ERRO NO BANCO: O feed não pode ser carregado! Volte e rode o comando SQL no Supabase para as 'Views' e 'Seguidores'.");
                setLoadingFeed(false);
            }); 
        } 
    }, [view, isAuthenticated]);

    if (!authChecked) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-10 h-10 border-4 border-neonBlue border-t-transparent rounded-full animate-spin"></div></div>;
    if (!isAuthenticated) return <AuthView onAuthSuccess={() => setIsAuthenticated(true)} />;

    const navigate = (newView, params = {}) => { setView(newView); setViewParams(params); window.scrollTo(0, 0); };

    return (
        <div className="min-h-screen pb-24 pt-20 px-4 max-w-md mx-auto relative overflow-hidden">
            <Header navigate={navigate} />
            <main>
                {view === 'feed' && (
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-2 mb-6 mt-2"><h2 className="text-xl font-bold text-white">Feed Principal</h2></div>
                        {loadingFeed ? <div className="text-center py-10"><div className="w-8 h-8 border-4 border-neonBlue border-t-transparent rounded-full animate-spin mx-auto"></div></div> : feedPosts.length === 0 ? <div className="text-center text-gray-500 py-10">O feed está vazio. Seja o primeiro a postar!</div> : feedPosts.map(post => <PostCard key={post.id} post={post} navigate={navigate} onDeleted={(id)=>setFeedPosts(feedPosts.filter(p=>p.id!==id))} />)}
                    </div>
                )}
                {view === 'explore' && <ExploreView navigate={navigate} />}
                {view === 'profile' && <ProfileView navigate={navigate} viewParams={viewParams} />}
                {view === 'editProfile' && <EditProfileView navigate={navigate} />}
                {view === 'bytes' && <BytesView navigate={navigate} />}
                {view === 'create' && <CreateView navigate={navigate} />}
                {view === 'admin' && <AdminView navigate={navigate} />}
            </main>

            <nav className="fixed bottom-0 left-0 w-full glass rounded-none rounded-t-[1.5rem] px-2 py-3 flex justify-around items-center z-40 border-t border-white/5">
                {[ { id: 'feed', icon: 'home', label: 'Início' }, { id: 'explore', icon: 'search', label: 'Explorar' }, { id: 'create', isCenter: true }, { id: 'bytes', icon: 'bytes', label: 'Bytes' }, { id: 'profile', icon: 'user', label: 'Perfil' }
                ].map((item) => (
                    item.isCenter ? (
                        <div key="center" className="relative w-16 h-10 flex justify-center">
                            <button onClick={() => navigate('create')} className={`absolute -top-8 w-14 h-14 rounded-full flex items-center justify-center text-white border-[5px] border-[#050816] transform transition-all z-50 ${view === 'create' ? 'bg-gradient-to-r from-error to-pink-500 rotate-45' : 'bg-gradient-to-r from-neonBlue to-neonPurple'}`}><Icon n="plus" c="w-6 h-6"/></button>
                        </div>
                    ) : (
                        <button key={item.id} onClick={() => navigate(item.id, item.id === 'profile' ? {userId: CURRENT_USER_ID} : {})} className={`flex flex-col items-center w-12 transition-colors ${view === item.id ? 'text-neonBlue scale-110' : 'text-textMuted hover:text-white'}`}>
                            <Icon n={item.icon} c="w-6 h-6 mb-1"/><span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    )
                ))}
            </nav>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

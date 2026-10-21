/** Supabase facultatif en préversion : aucune clé privée ne doit être chargée côté client. */
export class CloudStore {
 constructor(config=globalThis.ATLAS_CONFIG||{}) {
  this.client=(config.supabaseUrl && config.supabaseAnonKey && globalThis.supabase?.createClient)
   ? globalThis.supabase.createClient(config.supabaseUrl,config.supabaseAnonKey) : null;
  this.user=null;
 }
 get ready(){return Boolean(this.client)}
 async signup({email,password,username}){
  if(!this.client)throw Error('Connexion Supabase indisponible.');
  const {data,error}=await this.client.auth.signUp({email,password,options:{data:{username}}});
  if(error)throw error;return data;
 }
 async signin({email,password}){
  if(!this.client)throw Error('Connexion Supabase indisponible.');
  const {data,error}=await this.client.auth.signInWithPassword({email,password});
  if(error)throw error;this.user=data.user;return data;
 }
 async currentUser(){
  if(!this.client)return null;
  const {data,error}=await this.client.auth.getUser(); if(error)return null;
  this.user=data.user;return this.user;
 }
 async signout(){if(this.client){const {error}=await this.client.auth.signOut();if(error)throw error;}this.user=null;}
 async read(){
  if(!this.user)throw Error('Connecte-toi pour retrouver ton Atlas.');
  const {data,error}=await this.client.from('atlas_data').select('payload,updated_at').eq('user_id',this.user.id).maybeSingle();
  if(error)throw error;return data?.payload || null;
 }
 async write(payload){
  if(!this.user)throw Error('Session expirée, modifications encore locales.');
  const {error}=await this.client.from('atlas_data').upsert({user_id:this.user.id,payload,updated_at:new Date().toISOString()},{onConflict:'user_id'});
  if(error)throw error;
 }
}

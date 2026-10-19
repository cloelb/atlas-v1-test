/** ATLAS — configuration publique (côté navigateur)
 * IMPORTANT : seule une clé sb_publishable_ est autorisée ici.
 * Ne jamais y insérer de clé sb_secret_, service_role ni mot de passe.
 * Les données sont privées grâce aux politiques RLS de la base Supabase.
 */
window.ATLAS_CONFIG = {
  supabaseUrl: 'https://qdyhjqyxdhimbbdkskvm.supabase.co',
  supabaseAnonKey: 'sb_publishable_80OuWljXUloapjFYMf0F6A_nWNae2lH',
  founderUserId: '' // à renseigner APRÈS création du vrai compte de la fondatrice
};

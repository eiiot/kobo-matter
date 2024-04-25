export const CLIENT_TYPE = "integration";
export const MATTER_API_VERSION = "v18";
export const MATTER_API_DOMAIN = "api.getmatter.app";
export const MATTER_API_HOST = `https://${MATTER_API_DOMAIN}/api/${MATTER_API_VERSION}`;
export const ENDPOINTS = {
  QR_LOGIN_TRIGGER: `${MATTER_API_HOST}/qr_login/trigger/`,
  QR_LOGIN_EXCHANGE: `${MATTER_API_HOST}/qr_login/exchange/`,
  REFRESH_TOKEN_EXCHANGE: `${MATTER_API_HOST}/token/refresh/`,
  HIGHLIGHTS_FEED: `${MATTER_API_HOST}/library_items/highlights_feed/`,
  QUEUE_FEED: `${MATTER_API_HOST}/library_items/queue_feed/`,
};

export interface FeedResponse {
  id: string;
  feed: Feed[];
  next: null;
  previous: null;
  current_profile: CurrentProfile;
}

export interface CurrentProfile {
  id: number;
  profile_type: number;
  first_name: string;
  last_name: string;
  name: string;
  is_managed: boolean;
  avatar_photo: null;
  gradient_start: null;
  gradient_end: null;
  twitter_url: string;
  description: null;
  description_links: any[];
  primary_association: null;
  has_profile_card: boolean;
  location: null;
  personal_url: null;
  cta_url: null;
  cta_title: null;
  cta_emoji: null;
  handles: Handle[];
  communities: any[];
  has_paid_version: boolean;
  url: null;
  domain: null;
  domain_photo: null;
  display_name: string;
  any_name: string;
  is_primary: boolean;
  email: string;
  linked_author_id: null;
  linked_publisher_id: null;
  extracts_reliably: boolean;
  twitter_user_id: string;
  twitter_user_name: string;
  primary_publisher: null;
  photo_url: null;
  linked_author: null;
  linked_publisher: null;
  account_id: number;
  signup_complete: boolean;
  signup_complete_date: string;
  phone_number: null;
  is_staff: boolean;
  kindle_handle: string;
  email_forwarding_address_subs: string;
  email_forwarding_address_save: string;
  has_used_ios_app: boolean;
  has_saved_from_web_extension: boolean;
  tts_voice: number;
  invite_page_url: string;
  public_profile_url: string;
  invitation_links: InvitationLink[];
  twitter_account: TwitterAccount;
  readwise_account: null;
  notion_account: null;
  google_account: null;
  email_forwarding_accounts: EmailForwardingAccount[];
  pocket_account: PocketAccount;
  kindle_account: KindleAccount;
  instapaper_account: null;
  push_enabled: boolean;
  article_tutorial_seen: boolean;
  rate_us_prompt_seen: boolean;
  has_imported_contacts: boolean;
  has_connected_extension: boolean;
  follow_count: number;
  follower_count: number;
  uuid: string;
  is_patron: boolean;
  is_premium: boolean;
  payment_from: number;
  premium_expiration_date: string;
  premium_type: number;
  premium_trial_start_date: null;
  premium_trial_end_date: null;
  ab_assignments: any[];
  referral_token: string;
}

export interface EmailForwardingAccount {
  id: number;
  email_address: string;
  forward_type: number;
  created_date: string;
}

export interface Handle {
  id: number;
  handle: string;
  created_date: string;
}

export interface InvitationLink {
  id: number;
  created_date: string;
  invitation_type: number;
  invite_code: string;
  invite_url: string;
  phone_number: null;
  max_uses: number;
  num_claimed: number;
  num_shared: number;
}

export interface KindleAccount {
  id: number;
  kindle_email: string;
}

export interface PocketAccount {
  id: number;
  ingest_complete: boolean;
  import_type: number;
}

export interface TwitterAccount {
  id: number;
  twitter_user_name: string;
  twitter_user_id: string;
}

export interface Feed {
  id: string;
  content: Content;
  recommendations: any[];
  annotations: any[];
}

export interface Content {
  id: number;
  url: string;
  title: string;
  author: Publisher | null;
  publisher: Publisher;
  newsletter_profile: null;
  audio_content: AudioContent | null;
  publication_date: string | null;
  feed_date: string;
  sub_title: null | string;
  excerpt: string;
  blurb: null | string;
  photo_thumbnail_url: null | string;
  photo_primary_color: null | string;
  source_type: number;
  in_discover_feed: boolean;
  discover_feed_date: string | null;
  matter_published_date: string | null;
  is_staff_pick: boolean;
  is_twitter_thread: boolean;
  history: History;
  library: Library;
  my_annotations: MyAnnotation[];
  my_note: null;
  social_annotations: any[];
  tags: Tag[];
  feed_dirty_date: string;
  was_blocked: boolean;
  prefetch_candidate: boolean;
  rss_feed: null;
  share_url: string;
  article: Article | null;
  has_blank_article: boolean;
  content_type: number;
  pdf_content: null;
  pdf_file: null;
}

export interface Article {
  id: number;
  url: string;
  title: string;
  authors: string[];
  publisher: Publisher;
  publication_date: string | null;
  word_count: number;
  reading_time_minutes: number;
  markdown: string;
  language: string;
  is_rtl: boolean;
}

export interface Publisher {
  id: number;
  profile_type: number;
  first_name: null | string;
  last_name: null | string;
  name: string;
  is_managed: boolean;
  avatar_photo: null | string;
  gradient_start: null | string;
  gradient_end: null | string;
  twitter_url: null | string;
  description: null | string;
  description_links: DescriptionLink[];
  primary_association: null;
  has_profile_card: boolean;
  location: null | string;
  personal_url: null;
  cta_url: null;
  cta_title: null;
  cta_emoji: null;
  handles: any[];
  communities: any[];
  has_paid_version: boolean;
  url: null | string;
  domain: null | string;
  domain_photo: null | string;
  display_name: null | string;
  any_name: string;
  is_primary: boolean;
  email: null;
  linked_author_id: null;
  linked_publisher_id: null;
  twitter_user_id?: null;
  twitter_user_name?: null;
  primary_publisher: null;
  photo_url: null | string;
  linked_author: null;
  linked_publisher: null;
  follow_count: number;
  follower_count: number;
}

export interface DescriptionLink {
  id: number;
  link_type: number;
  title: string;
  url: string;
}

export interface AudioContent {
  id: number;
  audio_length: number;
  audio_url: string;
  is_partial: boolean;
  intro_audio_content: string;
  intro_audio_length: number;
}

export interface History {
  id: number;
  content_id: number;
  last_viewed_date: string | null;
  last_interaction_date: string;
  last_annotated_date: string | null;
  feed_dirty_date: string;
  last_read_percentage: number | null;
  max_read_percentage: number | null;
  last_audio_percentage: number | null;
  max_audio_percentage: number | null;
}

export interface Library {
  id: number;
  content_id: number;
  library_state: number;
  library_state_date: string;
  modified_date: string;
  feed_dirty_date: string;
  is_favorited: boolean;
  last_favorited_date: null;
  rating: null;
  last_rating_date: null;
  queue_order: number;
  swhighlight: null;
}

export interface MyAnnotation {
  id: number;
  content_id: number;
  text: string;
  before_text: string;
  after_text: string;
  word_start: number;
  word_end: number;
  char_start: number;
  char_end: number;
  scope: number;
  note: null;
  created_date: string;
  is_liked: boolean;
}

export interface Tag {
  id: number;
  name: string;
  created_date: string;
  last_used_date: string;
  article_count: number;
}

export interface QRLoginExchangeResponse {
  access_token?: string | null;
  refresh_token?: string | null;
}

class RequestError extends Error {
  response: Response;

  public constructor(response: Response, message?: string) {
    super(message);
    this.response = response;
  }
}

export async function authedRequest(
  accessToken: string,
  url: string,
  fetchArgs: RequestInit = {},
) {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    ...fetchArgs,
    headers,
  });

  if (!response.ok) {
    throw new RequestError(response, "Matter authenticated request failed");
  }

  return await response.json();
}

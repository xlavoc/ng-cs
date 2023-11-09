export interface Flight {
  crew: {
    crew?: string;
    role?: string;
  }[];
  date_utc: string;
  details: string | null;
  flight_number: number;
  id: string;
  launchpad: {
    name: string | null;
    locality: string | null;
    id: string;
  };
  links: {
    article: string | null;
    flickr: {
      small: string[];
      original: string[];
    };
    patch: {
      small: string | null;
      large: string | null;
    };
    presskit: string | null;
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    webcast: string | null;
    wikipedia: string | null;
    youtube_id: string | null;
  };
  name: string;
  rocket: {
    flickr_images: string[];
    name: string;
    id: string;
  };
  success: boolean | null;
}

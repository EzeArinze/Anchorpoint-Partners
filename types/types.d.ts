type Feature = {
  minimum: string;
  maximum: string;
  ReferralBonus?: string;
  Support?: string;
};

type Plan = {
  name: string;
  tagline: string;
  rate: string;
  period: string;
  features: Feature[];
  includes: string;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type iAppProps = {
  id: number;
  image: string;
  title: string;
  slug?: string;
  link: string;
  small_description: string;
  description?: string;
};

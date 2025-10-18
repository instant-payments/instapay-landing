export type InteractiveStory = {
  id: string;
  title: string;
  image: string;
  highlighted: true;
  slide: {
    image: string;
    text: string;
    subtext: string;
    cta: string;
    website: string;
  };
};

export type StaticStory = {
  id: string;
  title: string;
  image: string;
  highlighted: false;
};

export type Story = InteractiveStory | StaticStory;

import { Section } from './graphql';

export enum ContentType {
  THEORY = 'Theory',
  VIDEO = 'Video',
  TEST = 'Test'
}

export enum SectionChildren {
  THEORY = 'Theory',
  VIDEO = 'Video',
  TEST = 'Test'
}

export type AdminCourse = {
  title?: string;
  description?: string;
  image?: string;
  sections: Array<Omit<Section, 'id'>>;
  isPublished?: boolean;
  isFree?: boolean;
};

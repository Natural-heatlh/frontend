import { Course, Section } from './graphql';

export enum ContentType {
  THEORY = 'Theory',
  VIDEO = 'Video',
  TEST = 'Test'
}

export enum SectionChildren {
  THEORY = 'Теория',
  VIDEO = 'Видео',
  TEST = 'Тест'
}

export type AdminCourse = {
  title?: string;
  description?: string;
  image?: string;
  sections: Array<Omit<Section, 'id'>>;
  isPublished?: boolean;
  isFree?: boolean;
};

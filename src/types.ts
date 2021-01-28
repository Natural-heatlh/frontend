import { Course, Section } from './graphql';

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
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  sections: Array<Section>;
  isPublished?: boolean;
  isFree?: boolean;
};

export type State = {
  course: AdminCourse;
  courses: Course[];
  auth: {
    isLoggedIn: boolean;
  };
  test?: Array<any>;
};

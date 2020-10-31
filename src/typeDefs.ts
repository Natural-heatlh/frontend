import { gql } from '@apollo/client';

export const typeDefs = gql`
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE
  directive @specifiedBy(url: String!) on SCALAR
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  type Answer {
    id: ID!
    title: String
  }

  type TestItem {
    question: String
    answers: [Answer]
    correctAnswer: String
    isCompleted: Boolean
  }

  type Test {
    title: String!
    description: String
    type: String!
    items: [TestItem]
  }

  type Theory {
    title: String
    type: String!
    content: String
  }

  type Video {
    title: String
    type: String!
    url: String
  }

  union SectionChildren = Theory | Video | Test

  type Section {
    title: String
    children: [SectionChildren]
  }

  input SectionInput {
    title: String
    children: [SectionChildrenInput]
  }

  type Course {
    title: String
    description: String
    sections: [Section]
  }

  input TestItemInput {
    question: String
    answers: [AnswerInput]
    correctAnswer: String
    isCompleted: Boolean
  }

  input TestInput {
    title: String
    description: String
    items: [TestItemInput]
  }

  input SectionChildrenInput {
    title: String
    content: String
    url: String
    type: String
    description: String
    items: [TestItemInput]
  }

  input TheoryInput {
    title: String
    content: String
  }

  input VideoInput {
    title: String
    url: String
  }

  input AnswerInput {
    title: String
  }

  input CreateCourseInput {
    title: String
    description: String
    sections: [SectionInput]
  }

  input updateCourseInput {
    title: String
    description: String
    sections: [SectionInput]
  }

  type Query {
    courses: [Course]
    course(id: String!): Course
  }

  type Mutation {
    createCourse(input: CreateCourseInput): Course
    updateCourse(id: ID!, input: updateCourseInput): Course
    deleteCourse(id: ID!): Course
  }
`;

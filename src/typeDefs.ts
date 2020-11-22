import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Answer {
    title: String
    number: Int
  }

  type TestItem {
    question: String
    answers: [Answer]
    correctAnswerNumber: Int
    isCompleted: Boolean
  }

  type Test {
    title: String
    description: String
    type: String
    items: [TestItem]
  }

  type Slide {
    id: ID
    url: String
  }

  type Theory {
    title: String
    type: String
    content: String
    slides: [Slide]
    audio: String
  }

  type Video {
    title: String
    type: String
    url: String
  }

  union SectionChildren = Theory | Video | Test

  type Section {
    id: ID!
    title: String
    children: [SectionChildren]
  }

  type Course {
    id: ID!
    title: String!
    description: String
    sections: [Section]
  }

  type Progress {
    id: ID!
  }

  type UserCourse {
    id: ID!
    progress: [Progress]
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    city: String
    country: String
    partnerID: String
    courses: [UserCourse]
  }

  input SectionInput {
    title: String
    children: [SectionChildrenInput]
  }

  input TestItemInput {
    question: String
    answers: [AnswerInput]
    correctAnswerNumber: Int
    isCompleted: Boolean
  }

  input TestInput {
    title: String
    description: String
    items: [TestItemInput]
  }

  input SlideInput {
    url: String
  }

  input SectionChildrenInput {
    title: String
    content: String
    url: String
    type: String!
    description: String
    slides: [SlideInput]
    audio: String
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
    number: Int
  }

  input CreateCourseInput {
    title: String!
    description: String
    sections: [SectionInput]
  }

  input updateCourseInput {
    title: String
    description: String
    sections: [SectionInput]
  }

  type Query {
    courses: [Course]!
    course(id: ID!): Course
    user(id: ID!): User
    currentUser: User
  }

  type Mutation {
    createCourse(input: CreateCourseInput): Course
    updateCourse(id: ID!, input: updateCourseInput): Course
    deleteCourse(id: ID!): Course
  }
`;

import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Answer {
    id: String
    title: String
    isCorrect: Boolean
  }

  type TestItem {
    id: String
    question: String
    answers: [Answer]
    isCompleted: Boolean
  }

  input TestResultItemInput {
    id: String
    value: String
  }

  input TestResultInput {
    courseId: String
    id: String
    results: [TestResultItemInput]
  }

  type TestResult {
    id: String
    correct: Int
    wrong: Int
    isCompleted: Boolean
  }

  type Test {
    lectureId: String
    title: String
    description: String
    type: String
    items: [TestItem]
  }

  type Slide {
    id: ID
    url: String
    uid: String
    name: String
    status: String
  }

  type Theory {
    lectureId: String
    title: String
    type: String
    content: String
    slides: [Slide]
    audio: String
  }

  type Video {
    lectureId: String
    title: String
    type: String
    url: String
  }

  union SectionChildren = Theory | Video | Test

  type Section {
    sectionId: ID!
    title: String
    children: [SectionChildren]
  }

  type Course {
    courseId: ID!
    title: String!
    image: String
    description: String
    sections: [Section]
    isPublished: Boolean
    isFree: Boolean
  }

  type UserCourse {
    courseId: ID!
    progress: [String]
    isCompleted: Boolean
  }

  input UserDataInput {
    firstName: String
    lastName: String
    city: String
    country: String
    partnerID: String
    phone: String
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
    phone: String
    role: String
  }

  input SectionInput {
    sectionId: String
    title: String
    children: [SectionChildrenInput]
  }

  input TestItemInput {
    question: String
    answers: [AnswerInput]
    isCompleted: Boolean
  }

  input TestInput {
    title: String
    description: String
    items: [TestItemInput]
  }

  input SlideInput {
    url: String
    name: String
    uid: String
    status: String
  }

  input SectionChildrenInput {
    lectureId: String
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
    lectureId: String
    title: String
    content: String
  }

  input VideoInput {
    lectureId: String
    title: String
    url: String
  }

  input AnswerInput {
    title: String
    isCorrect: Boolean
  }

  input CreateCourseInput {
    courseId: String!
    title: String!
    description: String
    sections: [SectionInput]
    image: String
    isPublished: Boolean
    isFree: Boolean
  }

  input updateCourseInput {
    title: String
    description: String
    sections: [SectionInput]
    image: String
    isPublished: Boolean
    isFree: Boolean
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
    buyCourse(id: ID!): User
    addToProgress(id: ID!, courseId: ID!): User
    checkTestResult(input: TestResultInput): TestResult
    updateUserData(input: UserDataInput): User
    updateUserPassword(currentPassword: String, password: String): User
  }
`;

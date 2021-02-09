import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Answer = {
  __typename?: 'Answer';
  answerId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  isCorrect?: Maybe<Scalars['Boolean']>;
};

export type TestItem = {
  __typename?: 'TestItem';
  itemId?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  isCompleted?: Maybe<Scalars['Boolean']>;
};

export type TestResultItemInput = {
  id?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TestResultInput = {
  courseId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<TestResultItemInput>>>;
};

export type TestResult = {
  __typename?: 'TestResult';
  id?: Maybe<Scalars['String']>;
  correct?: Maybe<Scalars['Int']>;
  wrong?: Maybe<Scalars['Int']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
};

export type Test = {
  __typename?: 'Test';
  lectureId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<TestItem>>>;
};

export type Slide = {
  __typename?: 'Slide';
  slideId?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Audio = {
  __typename?: 'Audio';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

export type Theory = {
  __typename?: 'Theory';
  lectureId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  slides?: Maybe<Array<Maybe<Slide>>>;
  audio?: Maybe<Audio>;
};

export type Video = {
  __typename?: 'Video';
  lectureId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type SectionChildren = Theory | Video | Test;

export type Section = {
  __typename?: 'Section';
  sectionId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<SectionChildren>>>;
};

export type Course = {
  __typename?: 'Course';
  courseId: Scalars['ID'];
  title: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<Section>>>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isFree?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  incomeDescription?: Maybe<Scalars['String']>;
};

export type UserCourse = {
  __typename?: 'UserCourse';
  courseId: Scalars['ID'];
  progress?: Maybe<Array<Maybe<Scalars['String']>>>;
  level?: Maybe<Scalars['Int']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
};

export type UserDataInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  partnerID?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type Certificate = {
  __typename?: 'Certificate';
  courseId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  partnerID?: Maybe<Scalars['String']>;
  courses?: Maybe<Array<Maybe<UserCourse>>>;
  certificates?: Maybe<Array<Maybe<Certificate>>>;
  status?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type SectionInput = {
  sectionId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<SectionChildrenInput>>>;
};

export type TestItemInput = {
  itemId?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<AnswerInput>>>;
  isCompleted?: Maybe<Scalars['Boolean']>;
};

export type TestInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<TestItemInput>>>;
};

export type SlideInput = {
  slideId?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type AudioInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

export type SectionChildrenInput = {
  lectureId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slides?: Maybe<Array<Maybe<SlideInput>>>;
  audio?: Maybe<AudioInput>;
  items?: Maybe<Array<Maybe<TestItemInput>>>;
};

export type TheoryInput = {
  lectureId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type VideoInput = {
  lectureId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type AnswerInput = {
  answerId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  isCorrect?: Maybe<Scalars['Boolean']>;
};

export type CreateCourseInput = {
  courseId: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<SectionInput>>>;
  image?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isFree?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
  incomeDescription?: Maybe<Scalars['String']>;
};

export type UpdateCourseInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  longDescription?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  incomeDescription?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<SectionInput>>>;
  image?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isFree?: Maybe<Scalars['Boolean']>;
  level?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  courses: Array<Maybe<Course>>;
  userCourses: Array<Maybe<Course>>;
  course?: Maybe<Course>;
  adminCourse?: Maybe<Course>;
  adminCourses: Array<Maybe<Course>>;
  user?: Maybe<User>;
  currentUser?: Maybe<User>;
};


export type QueryCourseArgs = {
  id: Scalars['ID'];
};


export type QueryAdminCourseArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse?: Maybe<Course>;
  updateCourse?: Maybe<Course>;
  deleteCourse?: Maybe<Course>;
  addToProgress?: Maybe<User>;
  checkTestResult?: Maybe<TestResult>;
  updateUserData?: Maybe<User>;
  updateUserPassword?: Maybe<User>;
};


export type MutationCreateCourseArgs = {
  input?: Maybe<CreateCourseInput>;
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID'];
  input?: Maybe<UpdateCourseInput>;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID'];
};


export type MutationAddToProgressArgs = {
  id: Scalars['ID'];
  courseId: Scalars['ID'];
};


export type MutationCheckTestResultArgs = {
  input?: Maybe<TestResultInput>;
};


export type MutationUpdateUserDataArgs = {
  input?: Maybe<UserDataInput>;
};


export type MutationUpdateUserPasswordArgs = {
  currentPassword?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CacheControlScope = 
  | 'PUBLIC'
  | 'PRIVATE';




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Answer: ResolverTypeWrapper<Answer>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  TestItem: ResolverTypeWrapper<TestItem>;
  TestResultItemInput: TestResultItemInput;
  TestResultInput: TestResultInput;
  TestResult: ResolverTypeWrapper<TestResult>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Test: ResolverTypeWrapper<Test>;
  Slide: ResolverTypeWrapper<Slide>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Audio: ResolverTypeWrapper<Audio>;
  Theory: ResolverTypeWrapper<Theory>;
  Video: ResolverTypeWrapper<Video>;
  SectionChildren: ResolversTypes['Theory'] | ResolversTypes['Video'] | ResolversTypes['Test'];
  Section: ResolverTypeWrapper<Omit<Section, 'children'> & { children?: Maybe<Array<Maybe<ResolversTypes['SectionChildren']>>> }>;
  Course: ResolverTypeWrapper<Course>;
  UserCourse: ResolverTypeWrapper<UserCourse>;
  UserDataInput: UserDataInput;
  Certificate: ResolverTypeWrapper<Certificate>;
  User: ResolverTypeWrapper<User>;
  SectionInput: SectionInput;
  TestItemInput: TestItemInput;
  TestInput: TestInput;
  SlideInput: SlideInput;
  AudioInput: AudioInput;
  SectionChildrenInput: SectionChildrenInput;
  TheoryInput: TheoryInput;
  VideoInput: VideoInput;
  AnswerInput: AnswerInput;
  CreateCourseInput: CreateCourseInput;
  UpdateCourseInput: UpdateCourseInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  TestItem: TestItem;
  TestResultItemInput: TestResultItemInput;
  TestResultInput: TestResultInput;
  TestResult: TestResult;
  Int: Scalars['Int'];
  Test: Test;
  Slide: Slide;
  ID: Scalars['ID'];
  Audio: Audio;
  Theory: Theory;
  Video: Video;
  SectionChildren: ResolversParentTypes['Theory'] | ResolversParentTypes['Video'] | ResolversParentTypes['Test'];
  Section: Omit<Section, 'children'> & { children?: Maybe<Array<Maybe<ResolversParentTypes['SectionChildren']>>> };
  Course: Course;
  UserCourse: UserCourse;
  UserDataInput: UserDataInput;
  Certificate: Certificate;
  User: User;
  SectionInput: SectionInput;
  TestItemInput: TestItemInput;
  TestInput: TestInput;
  SlideInput: SlideInput;
  AudioInput: AudioInput;
  SectionChildrenInput: SectionChildrenInput;
  TheoryInput: TheoryInput;
  VideoInput: VideoInput;
  AnswerInput: AnswerInput;
  CreateCourseInput: CreateCourseInput;
  UpdateCourseInput: UpdateCourseInput;
  Query: {};
  Mutation: {};
  Upload: Scalars['Upload'];
};

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  answerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCorrect?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestItem'] = ResolversParentTypes['TestItem']> = {
  itemId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  question?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Answer']>>>, ParentType, ContextType>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestResult'] = ResolversParentTypes['TestResult']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  wrong?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Test'] = ResolversParentTypes['Test']> = {
  lectureId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['TestItem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SlideResolvers<ContextType = any, ParentType extends ResolversParentTypes['Slide'] = ResolversParentTypes['Slide']> = {
  slideId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AudioResolvers<ContextType = any, ParentType extends ResolversParentTypes['Audio'] = ResolversParentTypes['Audio']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TheoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Theory'] = ResolversParentTypes['Theory']> = {
  lectureId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Slide']>>>, ParentType, ContextType>;
  audio?: Resolver<Maybe<ResolversTypes['Audio']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  lectureId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionChildrenResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionChildren'] = ResolversParentTypes['SectionChildren']> = {
  __resolveType: TypeResolveFn<'Theory' | 'Video' | 'Test', ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  sectionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['SectionChildren']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  courseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType>;
  isPublished?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isFree?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  incomeDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserCourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserCourse'] = ResolversParentTypes['UserCourse']> = {
  courseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  progress?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CertificateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Certificate'] = ResolversParentTypes['Certificate']> = {
  courseId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  partnerID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courses?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserCourse']>>>, ParentType, ContextType>;
  certificates?: Resolver<Maybe<Array<Maybe<ResolversTypes['Certificate']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  courses?: Resolver<Array<Maybe<ResolversTypes['Course']>>, ParentType, ContextType>;
  userCourses?: Resolver<Array<Maybe<ResolversTypes['Course']>>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryCourseArgs, 'id'>>;
  adminCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryAdminCourseArgs, 'id'>>;
  adminCourses?: Resolver<Array<Maybe<ResolversTypes['Course']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationCreateCourseArgs, never>>;
  updateCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'id'>>;
  deleteCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, 'id'>>;
  addToProgress?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddToProgressArgs, 'id' | 'courseId'>>;
  checkTestResult?: Resolver<Maybe<ResolversTypes['TestResult']>, ParentType, ContextType, RequireFields<MutationCheckTestResultArgs, never>>;
  updateUserData?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserDataArgs, never>>;
  updateUserPassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserPasswordArgs, never>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  TestItem?: TestItemResolvers<ContextType>;
  TestResult?: TestResultResolvers<ContextType>;
  Test?: TestResolvers<ContextType>;
  Slide?: SlideResolvers<ContextType>;
  Audio?: AudioResolvers<ContextType>;
  Theory?: TheoryResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  SectionChildren?: SectionChildrenResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  UserCourse?: UserCourseResolvers<ContextType>;
  Certificate?: CertificateResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

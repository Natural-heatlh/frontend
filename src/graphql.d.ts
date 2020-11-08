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
  title?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
};

export type TestItem = {
  __typename?: 'TestItem';
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  correctAnswerNumber?: Maybe<Scalars['Int']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
};

export type Test = {
  __typename?: 'Test';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<TestItem>>>;
};

export type Theory = {
  __typename?: 'Theory';
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type Video = {
  __typename?: 'Video';
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type SectionChildren = Theory | Video | Test;

export type Section = {
  __typename?: 'Section';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<SectionChildren>>>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<Section>>>;
};

export type SectionInput = {
  title?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<SectionChildrenInput>>>;
};

export type TestItemInput = {
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<AnswerInput>>>;
  correctAnswerNumber?: Maybe<Scalars['Int']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
};

export type TestInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<TestItemInput>>>;
};

export type SectionChildrenInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<TestItemInput>>>;
};

export type TheoryInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type VideoInput = {
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type AnswerInput = {
  title?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
};

export type CreateCourseInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<SectionInput>>>;
};

export type UpdateCourseInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sections?: Maybe<Array<Maybe<SectionInput>>>;
};

export type Query = {
  __typename?: 'Query';
  courses: Array<Maybe<Course>>;
  course?: Maybe<Course>;
};


export type QueryCourseArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse?: Maybe<Course>;
  updateCourse?: Maybe<Course>;
  deleteCourse?: Maybe<Course>;
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
  Int: ResolverTypeWrapper<Scalars['Int']>;
  TestItem: ResolverTypeWrapper<TestItem>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Test: ResolverTypeWrapper<Test>;
  Theory: ResolverTypeWrapper<Theory>;
  Video: ResolverTypeWrapper<Video>;
  SectionChildren: ResolversTypes['Theory'] | ResolversTypes['Video'] | ResolversTypes['Test'];
  Section: ResolverTypeWrapper<Omit<Section, 'children'> & { children?: Maybe<Array<Maybe<ResolversTypes['SectionChildren']>>> }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Course: ResolverTypeWrapper<Course>;
  SectionInput: SectionInput;
  TestItemInput: TestItemInput;
  TestInput: TestInput;
  SectionChildrenInput: SectionChildrenInput;
  TheoryInput: TheoryInput;
  VideoInput: VideoInput;
  AnswerInput: AnswerInput;
  CreateCourseInput: CreateCourseInput;
  updateCourseInput: UpdateCourseInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  String: Scalars['String'];
  Int: Scalars['Int'];
  TestItem: TestItem;
  Boolean: Scalars['Boolean'];
  Test: Test;
  Theory: Theory;
  Video: Video;
  SectionChildren: ResolversParentTypes['Theory'] | ResolversParentTypes['Video'] | ResolversParentTypes['Test'];
  Section: Omit<Section, 'children'> & { children?: Maybe<Array<Maybe<ResolversParentTypes['SectionChildren']>>> };
  ID: Scalars['ID'];
  Course: Course;
  SectionInput: SectionInput;
  TestItemInput: TestItemInput;
  TestInput: TestInput;
  SectionChildrenInput: SectionChildrenInput;
  TheoryInput: TheoryInput;
  VideoInput: VideoInput;
  AnswerInput: AnswerInput;
  CreateCourseInput: CreateCourseInput;
  updateCourseInput: UpdateCourseInput;
  Query: {};
  Mutation: {};
  Upload: Scalars['Upload'];
};

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestItem'] = ResolversParentTypes['TestItem']> = {
  question?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Answer']>>>, ParentType, ContextType>;
  correctAnswerNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Test'] = ResolversParentTypes['Test']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['TestItem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TheoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Theory'] = ResolversParentTypes['Theory']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SectionChildrenResolvers<ContextType = any, ParentType extends ResolversParentTypes['SectionChildren'] = ResolversParentTypes['SectionChildren']> = {
  __resolveType: TypeResolveFn<'Theory' | 'Video' | 'Test', ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['SectionChildren']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  courses?: Resolver<Array<Maybe<ResolversTypes['Course']>>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryCourseArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationCreateCourseArgs, never>>;
  updateCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'id'>>;
  deleteCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, 'id'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  TestItem?: TestItemResolvers<ContextType>;
  Test?: TestResolvers<ContextType>;
  Theory?: TheoryResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  SectionChildren?: SectionChildrenResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

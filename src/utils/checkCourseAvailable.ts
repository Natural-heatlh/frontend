import { UserCourse } from '../graphql';

export type CheckProps = {
  isPublished: boolean;
  userStatus: number;
  courseStatus: number;
  isAvailableOfPrev: boolean;
};

export const getAvailableOfPrev = (courses: UserCourse[], level: number) => {
  switch (level) {
    case 0:
      return true;
    case 2:
      return !!courses.find(
        (item) => item.isCompleted && item.level === level - 2
      );
    default:
      return !!courses.find(
        (item) => item.isCompleted && item.level === level - 1
      );
  }
};

export const checkCourseAvailable = ({
  isPublished,
  userStatus,
  courseStatus,
  isAvailableOfPrev
}: CheckProps): [boolean, string] => {
  if (!isPublished) {
    return [false, 'Курс ещё не опубликован'];
  }

  if (Number(userStatus) === 0 && Number(courseStatus) !== 0) {
    return [
      false,
      'Для перехода к данному курсу Вам необходимо стать партнером!'
    ];
  }

  if (!isAvailableOfPrev) {
    return [false, 'Пройдите предыдущие курсы для перехода'];
  }

  if (Number(courseStatus) > Number(userStatus) + 1) {
    return [false, 'Вашего статуса недостаточно для прохождения этого курса!'];
  }

  return [true, 'Для перехода к курсу нажмите купить'];
};

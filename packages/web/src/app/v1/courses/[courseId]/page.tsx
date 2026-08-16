interface CourseDetailsPageProps {
  params: Promise<{ courseId: string }>;
}

const CourseDetailsPage = async ({ params }: CourseDetailsPageProps) => {
  const { courseId } = await params;

  return <div>CourseDetailsPage :{courseId}</div>;
};

export default CourseDetailsPage;

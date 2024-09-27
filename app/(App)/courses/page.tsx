"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import courses from "@/store/courses.json";

const CoursesPage = () => {
  const router = useRouter();

  const handleCourseClick = (id: string) => {
    router.push(`/courses/${id}`);
  };

  return (
    <div className="mt-20 lg:mt-0">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">Kurslar</h1>
      </div>
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="min-h-96 group border rounded-lg shadow-lg overflow-hidden transition duration-500"
            >
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                width={1920}
                height={1080}
                className="w-full h-48 object-cover transition-transform transform group-hover:scale-105 group-hover:shadow-lg duration-500"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-center">{course.title}</h2>
                <p className="text-gray-700 text-sm text-center">{course.description}</p>
                <div className="flex flex-row items-center mx-auto mt-6 justify-center gap-x-2">
                  <Button
                    onClick={() => handleCourseClick(course.id)}
                    variant="default"
                    className="w-full"
                  >
                    Devam et
                  </Button>
                  <Button
                    onClick={() => {console.log("Favoriye Eklendi" + course.id)}}
                    variant="default"
                    className="w-full"
                  >
                    Favoriye Ekle
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

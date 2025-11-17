import { fetchCategories } from "@/lib/api";
import { CategoriesResponse } from "@/types/categories";
import { useEffect, useState } from "react";

const CategoriesLabel = () => {
  const [data, setData] = useState<CategoriesResponse | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories()
      .then((res: CategoriesResponse) => setData(res))
      .catch((err) => console.error("Error fetching categories labels:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const combined = [
    ...data.categories.map((c) => ({ ...c, type: "category" })),
    ...data.personalised.map((c) => ({
      ...c,
      type: "personalised",
      color_code: undefined,
    })),
  ];

  const handleSelectCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      console.log("Selected Categories:", [...selectedCategories, categoryId]);
    }
  };

  return (
    <div
      className="
    flex gap-1 sm:gap-3 mb-4
    overflow-x-auto overflow-y-hidden
    whitespace-nowrap
    px-2 py-1
    scrollbar-hide
    snap-x snap-mandatory
    
    justify-start           /* mobile/tablet */
    items-center

    lg:justify-center       /* center only on desktop */
    lg:items-center
  "
    >
      {combined.map((item) => (
        <div
          key={item.category_id}
          className="snap-start shrink-0 relative m-[10px_8px_20px] flex h-[90px] w-[90px] items-center rounded-md justify-center border border-[#ddd] bg-[#f3f8ff] shadow-[0_0_20px_-8px_rgba(0,0,0,0.2)] active:scale-85 transition-transform duration-150 ease-in-out"
        >
          {item.type === "category" && (
            <>
              <span
                className="absolute w-[13px] h-[13px] rounded-full top-1 left-1"
                style={{
                  backgroundColor: item.color_code
                    ? item.color_code
                    : undefined,
                }}
              ></span>

              <input
                type="checkbox"
                checked={selectedCategories.includes(item.category_id)}
                onChange={() => {
                  handleSelectCategory(item.category_id);
                }}
                className="w-[15px] h-[15px] absolute top-1.5 right-1 cursor-pointer"
              />
            </>
          )}

          <img
            src={item.dev_image}
            alt={item.name}
            className="w-[35px] max-h-7 rounded-lg -mt-[18px] z-4"
          />
          <p className="w-full absolute bottom-[5px] text-center break-keep text-[12px] font-semibold px-[2px] whitespace-break-spaces m-0 leading-[1]">
            {item.name}
          </p>

          {item.counts && (
            <span className="absolute top-[calc(100%+10px)] font-bold text-[12px] text-black leading-none">
              {item.counts.toLocaleString()}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriesLabel;

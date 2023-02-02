import { Link, useParams } from "react-router-dom";
import useFetch from "../Utils/useFetch";

const Detailed = () => {
  let id = useParams().id;
  let [data, , isPending] = useFetch(
    `${process.env.REACT_APP_URL}project/${id}`
  );
  let date = new Date(data.date);
  console.log(data);
  if (isPending) {
    return (
      <div
        role="status"
        className="flex justify-center items-end px-3 py-3 h-96 md:py-0 md:-mt-7 md:ml-60"
      >
        <svg
          aria-hidden="true"
          className="w-28 h-28 mr-2 text-gray-200 animate-spin fill-black"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="detailed px-3 py-3 md:py-0 md:-mt-7 md:ml-60">
      <div className="flex justify-between items-center">
        <form className="my-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900  placeholder:text-gray-600  rounded-lg outline-none"
              placeholder="Search"
              required
            />
          </div>
        </form>
        <div className="btns">
          <button className="mr-3 text-md text-white bg-pink-700 py-1 px-3 rounded-md ring-1 ring-pink-700 hover:bg-pink-800">
            Create
          </button>
          <button className=" text-md text-black bg-white py-1 px-3 rounded-md ring-1 ring-black hover:bg-gray-100">
            Share
          </button>
        </div>
      </div>
      <div className="content flex justify-between px-3 mt-3">
        <div className="left flex-1 mr-6">
          <div className="header border-b-2 border-gray-100 p-3">
            <h1 className="text-3xl capitalize font-bold mb-2">
              {data.projectName}
            </h1>
            <div className="category text-gray-500">
              #Project in {data.category}
            </div>
          </div>
          <div className="description mt-3 ml-3">
            <p className="text-lg mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              obcaecati impedit, velit, dolores iste officia sit amet
              consectetur adipisicing elit. Autem nihil quis fugit magnam
              numquam eum, voluptatum, sed possimus corrupti debitis labore,
              aliquid illum amet dolorum commodi? Tenetur fugit voluptates sed.
              illum, ad amet nemo quia vel quasi! Placeat nostrum cupiditate
              repellat ut, non voluptatem quisquam ut, non voluptatem quisquam.
            </p>
            <ul className="list-disc ml-8 text-lg">
              <li className="mb-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
                cupiditate expedita porro a mollitia voluptatibus, non
                dignissimos quia culpa nesciunt? Voluptas facilis neque nisi
                nemo totam, excepturi iste consequuntur ratione?
              </li>
              <li className="mb-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
                cupiditate expedita porro a mollitia voluptatibus, non
                dignissimos quia culpa nesciunt? Voluptas facilis neque nisi
                nemo totam, excepturi iste consequuntur ratione?
              </li>
              <li className="mb-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
                cupiditate expedita porro a mollitia voluptatibus, non
                dignissimos quia culpa nesciunt? Voluptas facilis neque nisi
                nemo totam, excepturi iste consequuntur ratione?
              </li>
            </ul>
          </div>
          <div className="activity border-b-2 border-gray-100 p-3">
            <div className="text-xl font-semibold">Activity</div>
            <div className="comments px-3">
              <div className="comment mt-4 ">
                {data.Members && (
                  <div className="memberCommented flex items-center mt-2">
                    <img
                      src={data.Members[0].memberImage}
                      className="inline-block mr-2 h-9 w-9 object-cover object-center rounded-full ring-2 ring-white"
                      alt=""
                    />
                    <div className="flex-column">
                      <div className="font-semibold">
                        {data.Members[0].memberName}
                      </div>
                      <div className="text-gray-500">Commented 6 days ago</div>
                    </div>
                  </div>
                )}
                <p className="ml-11">
                  Doloribus eveniet amet similique quasi error, sint voluptas!
                  Odio neque nobis ratione quo. Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. A voluptate obcaecati eius,
                  quae distinctio dolorum non voluptatibus sint fugit,
                  quibusdam, ab voluptas perferendis ea ducimus quisquam alias
                  dolore expedita nesciunt!
                </p>
              </div>
              <div className="comment my-7">
                {data.Members && data.Members[1] && (
                  <div className="memberCommented flex items-center mt-2">
                    <img
                      src={data.Members[1].memberImage}
                      className="inline-block mr-2 h-9 w-9 object-cover object-center rounded-full ring-2 ring-white"
                      alt=""
                    />
                    <div className="flex-column">
                      <div className="font-semibold">
                        {data.Members[1].memberName}
                      </div>
                      <div className="text-gray-500">Commented 2 days ago</div>
                    </div>
                  </div>
                )}
                <p className="ml-11">
                  Doloribus eveniet amet similique quasi error, sint voluptas!
                  Odio neque nobis ratione quo. Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. A voluptate obcaecati eius,
                  quae distinctio dolorum non voluptatibus sint fugit,
                  quibusdam, ab voluptas perferendis ea ducimus quisquam alias
                  dolore expedita nesciunt!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="right border-l-2 border-gray-100 pl-3">
          <div className="firstSection p-3 border-b-2 border-gray-100">
            <div className="flex items-center text-green-500 font-semibold mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Open Issue
            </div>
            <div className="flex items-center text-gray-500 font-semibold mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              3 Comments
            </div>
            <div className="flex items-center text-gray-500 font-semibold mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              Created On {date.toDateString()}
            </div>
          </div>
          {data.Members && (
            <div className="secondSection p-3">
              <div className="text-gray-400 text-lg mb-3">Members</div>
              <ul>
                {data.Members.map((member, index) => {
                  console.log(member);
                  return (
                    <li className="flex items-center mb-3" key={index}>
                      <img
                        src={member.memberImage}
                        className="inline-block mr-2 h-8 w-8 object-cover object-center rounded-full ring-2 ring-white"
                        alt=""
                      />
                      <div className="font-semibold">{member.memberName}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detailed;

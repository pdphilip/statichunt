import { simplifyURL } from "@lib/utils/textConverter";
import { toolsArray } from "@lib/utils/toolsArray";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageFallback from "./ImageFallback";
import ToolsIcon from "./ToolsIcon";

const Examples = ({ examples, tools, customRowClass, customColClass }) => {
  const [item, setItem] = useState(4);
  const [page, setPage] = useState(examples.slice(0, item));

  // getWindowDimensions
  const [windowSize, setWindowSize] = useState(768);
  useEffect(() => {
    function showViewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      setWindowSize(width);
    }
    showViewport();
    window.onresize = showViewport;
  }, []);

  useEffect(() => {
    setItem(windowSize < 768 ? 4 : 20);
  }, [windowSize]);

  const fetchData = () => {
    setItem(item + 20);
  };
  useEffect(() => {
    setPage(examples.slice(0, item));
  }, [item, examples]);

  // tooltip
  useEffect(() => {
    var tooltipEl = document.querySelectorAll(".has-tooltip");
    if (tooltipEl) {
      var tooltipItems = document.querySelectorAll(".tooltip-label");
      tooltipItems.forEach((item) => {
        item.remove();
      });
      var length = tooltipEl.length;
      for (var i = 0; i < length; i++) {
        var attr = tooltipEl[i].getAttribute("data-tooltip");
        var x = document.createElement("SPAN");
        var t = document.createTextNode(attr);
        x.appendChild(t);
        x.className = "tooltip-label";
        tooltipEl[i].appendChild(x);
      }
    }
  });

  return (
    <InfiniteScroll
      dataLength={page.length}
      next={fetchData}
      hasMore={true}
      className={customRowClass ? customRowClass : "row !overflow-hidden py-4"}
    >
      {page.length > 0 ? (
        page.map((example) => (
          <div
            className={
              customColClass
                ? customColClass
                : "mb-8 sm:col-6 xl:col-4 2xl:col-3"
            }
            key={example.slug}
          >
            <div className="theme-card">
              <ImageFallback
                src={`/examples/${example.slug}.png`}
                fallback={`https://teamosis-sg.vercel.app/api/img?url=${example.frontmatter.website}`}
                height={240}
                width={360}
                alt={example.frontmatter?.title}
                className="w-full rounded-t"
              />
              <div className="theme-card-body">
                <h2 className="h6 mb-0 text-lg font-medium">
                  <Link
                    href={example.frontmatter.website}
                    className="line-clamp-1 hover:underline dark:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {simplifyURL(example.frontmatter.website)}
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="-1.6 -1.6 19.20 19.20"
                      fill="none"
                      className="ml-2"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                      <g id="SVGRepo_iconCarrier">
                        <g fill="#dfdfdf">
                          <path d="M9 .75A.75.75 0 019.75 0h4.5c.206 0 .393.083.529.218l.001.002.002.001A.748.748 0 0115 .75v4.5a.75.75 0 01-1.5 0V2.56L7.28 8.78a.75.75 0 01-1.06-1.06l6.22-6.22H9.75A.75.75 0 019 .75z" />
                          <path d="M3.25 3.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0110.75 14h-7.5A2.25 2.25 0 011 11.75v-7.5A2.25 2.25 0 013.25 2h4a.75.75 0 010 1.5h-4z" />
                        </g>
                      </g>
                    </svg>
                  </Link>
                </h2>
              </div>
              <div className="theme-card-footer">
                <div className="flex-wrap">
                  <ToolsIcon
                    tools={tools}
                    type={toolsArray(example)}
                    exampleCard={true}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No Examples Found!</h1>
      )}
    </InfiniteScroll>
  );
};

export default Examples;

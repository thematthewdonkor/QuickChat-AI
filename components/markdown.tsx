import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHiglight from "rehype-highlight";

export const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHiglight, { async: true }]]}
    >
      {content}
    </ReactMarkdown>
  );
};

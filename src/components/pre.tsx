import { CopyButton } from "./copy-button";

export const Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"] || "shell";
  return (
    <pre {...props} className="p-0">
      <div className="flex justify-between text-white p-2 bg-black">
        {lang}
        <CopyButton text={raw} />
      </div>
      <div className="p-4">
        {children}
      </div>
    </pre>
  );
};
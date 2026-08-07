import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import ts from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";
import jsx from "refractor/lang/jsx";
import sql from "refractor/lang/sql";
import bash from "refractor/lang/bash";
import markdown from "refractor/lang/markdown";
import css from "refractor/lang/css";
import scss from "refractor/lang/scss";
import python from "refractor/lang/python";
import html from "refractor/lang/markup";
import yaml from "refractor/lang/yaml";
import graphql from "refractor/lang/graphql";
import json from "refractor/lang/json";
import java from "refractor/lang/java";
import Clipoboard from "./Clipoboard";

// Supported languages: https://prismjs.com/#supported-languages
Refractor.registerLanguage(js);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(sql);
Refractor.registerLanguage(bash);
Refractor.registerLanguage(markdown);
Refractor.registerLanguage(css);
Refractor.registerLanguage(scss);
Refractor.registerLanguage(python);
Refractor.registerLanguage(html);
Refractor.registerLanguage(yaml);
Refractor.registerLanguage(graphql);
Refractor.registerLanguage(json);
Refractor.registerLanguage(java);

type codeTypes = {
  value: {
    code: string;
    language: string;
    filename?: string | null;
  };
};

export default function CodeBlock({ value }: codeTypes) {
  return (
    <div className="my-6">
      <div className="glass flex translate-y-2 items-center justify-between rounded-t-[18px] border-b-0 px-4 py-3">
        {value.filename && <p className="text-sm">{value.filename}</p>}
        <Clipoboard content={value.code} />
      </div>
      <Refractor
        language={value.language ?? "jsx"}
        value={value.code}
        className="rounded-b-[18px] border-x border-b border-black/[0.06] text-sm tracking-normal dark:border-white/[0.1]"
      />
    </div>
  );
}

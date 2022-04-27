import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import dracula from "prism-react-renderer/themes/dracula"
import { preToCodeBlock } from "mdx-utils"

const Code = ({ codeString, language }) => {

    return (
        <div>
            <Highlight
                {...defaultProps}
                code={codeString}
                language={language}
                theme={dracula}
            >
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => {
                    return (
                    <pre
                        className={className}
                        style={{padding: "1.0em", ...style}}
                    >
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, i })} key={i}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} key={key} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}}
            </Highlight>
        </div>
    )
}

const PreComponent = (preProps) => {
    const props = preToCodeBlock(preProps)
    if (props) {
        return <Code {...props} />
    } else {
        return <pre {...preProps} />
    }
}

export default PreComponent
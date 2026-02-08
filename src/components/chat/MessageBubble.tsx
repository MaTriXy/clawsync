import ReactMarkdown from 'react-markdown';
import './MessageBubble.css';

interface ToolCall {
  name: string;
  args: string;
  result: string;
}

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  toolCalls?: ToolCall[];
}

export function MessageBubble({ role, content, timestamp, toolCalls }: MessageBubbleProps) {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`message-bubble ${role}`}>
      {toolCalls && toolCalls.length > 0 && (
        <div className="tool-calls">
          {toolCalls.map((tc, i) => (
            <details key={i} className="tool-call">
              <summary className="tool-call-summary">
                <span className="tool-call-icon">&#9881;</span>
                <span className="tool-call-name">{tc.name}</span>
                <span className="tool-call-badge">tool call</span>
              </summary>
              <div className="tool-call-details">
                <div className="tool-call-section">
                  <strong>Input:</strong>
                  <pre className="tool-call-json">{tc.args}</pre>
                </div>
                {tc.result && (
                  <div className="tool-call-section">
                    <strong>Output:</strong>
                    <pre className="tool-call-json">{tc.result}</pre>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
      {content.trim() && (
        <div className="message-content">
          {role === 'assistant' ? (
            <ReactMarkdown
              components={{
                // Custom renderers for markdown elements
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="inline-code">{children}</code>
                  ) : (
                    <pre className="code-block">
                      <code>{children}</code>
                    </pre>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <p>{content}</p>
          )}
        </div>
      )}
      <span className="message-time">{formattedTime}</span>
    </div>
  );
}

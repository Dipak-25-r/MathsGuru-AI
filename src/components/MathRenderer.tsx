import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  className = '',
  block = false,
}) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // If whole content is pure display LaTeX or block is forced
    if (block && !content.includes('$')) {
      try {
        return katex.renderToString(content, {
          displayMode: true,
          throwOnError: false,
        });
      } catch (e) {
        return `<span class="text-rose-400 font-mono text-sm">${content}</span>`;
      }
    }

    // Parse mixed markdown and LaTeX ($...$ and $$...$$)
    // First replace block math $$...$$
    // Then replace inline math $...$
    let text = content;
    const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
    const inlineMathRegex = /\$([^\$\n]+?)\$/g;

    const placeholders: { id: string; html: string }[] = [];
    let counter = 0;

    // Replace block math
    text = text.replace(blockMathRegex, (_, math) => {
      const placeholder = `__MATH_BLOCK_${counter++}__`;
      try {
        const rendered = katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        });
        placeholders.push({
          id: placeholder,
          html: `<div class="my-3 py-1 px-2 overflow-x-auto text-amber-200">${rendered}</div>`,
        });
      } catch (err) {
        placeholders.push({
          id: placeholder,
          html: `<div class="font-mono text-xs text-rose-400 p-2 bg-slate-900 rounded">${math}</div>`,
        });
      }
      return placeholder;
    });

    // Replace inline math
    text = text.replace(inlineMathRegex, (_, math) => {
      const placeholder = `__MATH_INLINE_${counter++}__`;
      try {
        const rendered = katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
        placeholders.push({
          id: placeholder,
          html: `<span class="inline-math text-amber-100 font-medium px-1">${rendered}</span>`,
        });
      } catch (err) {
        placeholders.push({
          id: placeholder,
          html: `<span class="font-mono text-xs text-rose-300">$${math}$</span>`,
        });
      }
      return placeholder;
    });

    // Escape basic HTML tags in regular text to avoid XSS
    const escapeHtml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br />');

    // Split text into tokens and reassemble
    let finalHtml = escapeHtml(text);

    // Restore math placeholders
    for (const item of placeholders) {
      finalHtml = finalHtml.replace(item.id, item.html);
    }

    return finalHtml;
  }, [content, block]);

  return (
    <div
      className={`math-content font-sans text-slate-200 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

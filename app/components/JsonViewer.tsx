'use client';

interface JsonViewerProps {
  data: any;
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const renderValue = (value: any, key: string = '', level: number = 0): JSX.Element => {
    const indent = '  '.repeat(level);
    const isMainHeader = level === 1 && typeof value === 'object' && value !== null && !Array.isArray(value);

    if (value === null) {
      return (
        <span key={key}>
          <span className="text-gray-600 dark:text-gray-400">null</span>
        </span>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <span key={key}>
          <span className="text-purple-600 dark:text-purple-400">{value.toString()}</span>
        </span>
      );
    }

    if (typeof value === 'number') {
      return (
        <span key={key}>
          <span className="text-blue-600 dark:text-blue-400">{value}</span>
        </span>
      );
    }

    if (typeof value === 'string') {
      return (
        <span key={key}>
          <span className="text-green-600 dark:text-green-400">&quot;{value}&quot;</span>
        </span>
      );
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span key={key}>[]</span>;
      }
      return (
        <span key={key}>
          {'[\n'}
          {value.map((item, index) => (
            <span key={index}>
              {indent}  {renderValue(item, `${key}-${index}`, level + 1)}
              {index < value.length - 1 ? ',' : ''}
              {'\n'}
            </span>
          ))}
          {indent}]
        </span>
      );
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) {
        return <span key={key}>{'{}'}</span>;
      }

      return (
        <span key={key}>
          {'{\n'}
          {entries.map(([k, v], index) => (
            <span key={k}>
              {indent}
              <span className={isMainHeader ? 'text-red-600 dark:text-red-400 font-bold' : 'text-gray-700 dark:text-gray-300'}>
                &quot;{k}&quot;
              </span>
              {': '}
              {renderValue(v, k, level + 1)}
              {index < entries.length - 1 ? ',' : ''}
              {'\n'}
            </span>
          ))}
          {indent}{'}'}
        </span>
      );
    }

    return <span key={key}>{String(value)}</span>;
  };

  return (
    <div className="bg-gray-50 dark:bg-black rounded-xl p-4 overflow-x-auto">
      <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre font-mono">
        {renderValue(data, 'root', 0)}
      </pre>
    </div>
  );
}

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

interface DynamicJoditEditorProps {
  value: string;
  onChange: (newContent: string) => void;
}

const DynamicJoditEditor: React.FC<DynamicJoditEditorProps> = (props) => {
  return <JoditEditor {...props} />;
};

export default DynamicJoditEditor;

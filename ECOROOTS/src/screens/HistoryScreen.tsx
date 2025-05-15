
import { useEffect, useState } from 'react';
import { getTrees } from '../services/treeService';
import { Tree } from '../types/Tree';
import TreeList from '../components/TreeList';

const HistoryScreen: React.FC = () => {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    getTrees().then(setTrees);
  }, []);

  return (
    <div>
      <h2>My Planted Trees</h2>
      <TreeList trees={trees} />
    </div>
  );
};

export default HistoryScreen;

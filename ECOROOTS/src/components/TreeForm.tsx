
import { useState } from 'react';
import { saveTree } from '../services/treeService';
import { Tree } from '../types/Tree';

interface TreeFormProps {
  onSuccess: () => void;
}

const TreeForm: React.FC<TreeFormProps> = ({ onSuccess }) => {
  const [species, setSpecies] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!species || !date) return alert('Please fill out all fields');
    const newTree: Tree = { species, date };
    await saveTree(newTree);
    setSpecies('');
    setDate('');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tree species"
        value={species}
        onChange={e => setSpecies(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button type="submit">Log Tree</button>
    </form>
  );
};

export default TreeForm;

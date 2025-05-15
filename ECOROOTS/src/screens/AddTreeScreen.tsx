
import TreeForm from '../components/TreeForm';

const AddTreeScreen: React.FC = () => {
  const handleSuccess = () => {
    alert('Tree logged!');
  };

  return (
    <div>
      <h2>Log a Tree</h2>
      <TreeForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AddTreeScreen;

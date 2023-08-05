import { useNavigate } from 'react-router-dom';

function GoBack() {
    const navigate = useNavigate(); 

    return (
        <button onClick={() => navigate(-1)}>Go back</button>
    );
}

export default GoBack;

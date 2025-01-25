import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ name, parts }) => {                                 
    return (
        <div>
            <Header text={name}></Header>
            <Content parts={parts}></Content>
            <Total parts={parts}></Total>
        </div>
    )
}

export default Course;


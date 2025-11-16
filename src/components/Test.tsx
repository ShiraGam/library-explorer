import {useState} from "react";

export interface ITestProps {
    title: string;
    num: number;
}

export function Header({title, num}: ITestProps) {
    if (num === 0) {
        return null
    }

    return <div>{title}</div>;
}


export function Test({title, num}: ITestProps) {
    const [age, setAge] = useState<number>(num)

    return (
        <>

            <div>{title}</div>
            <button onClick={() => {
                // const x = num + 1
                // console.log(x)
                // num = x
                setAge(age + age)

            }}>+</button>
            <div>{age}</div>

        </>
    );
}
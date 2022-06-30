import { Relative } from './package/a';
import { Relative2 } from '../../package/b';

function ComponentA() {
  return (
    <>
      <Relative></Relative>
      <Relative />
      <Relative.Bar />
      <Relative2 />
    </>
  );
}

function ComponentB() {
  return (
    <>
      <ComponentA />
      <Relative
        string="string"
        implicitTrue
        false={false}
        expression={() => {
          console.log('test');
        }}
        longExpression={() => {
          console.log('Lorem ipsum dolor sit amet');
        }}
        number={1}
      />
    </>
  );
}

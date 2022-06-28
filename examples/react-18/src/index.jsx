import { Foo } from 'package/a';
import { Baz } from 'package/b';

function ComponentA() {
  return (
    <>
      <Foo></Foo>
      <Foo />
      <Foo.Bar />
      <Baz />
    </>
  );
}

function ComponentB() {
  return (
    <>
      <Foo
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

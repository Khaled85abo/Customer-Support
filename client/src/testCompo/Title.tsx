const Title = ({ title }: { title: string }) => {
  return (
    <>
      <h1>{title}</h1>
      <a href="learnReact.com" data-testid="learn-link"></a>
    </>
  );
};

export default Title;

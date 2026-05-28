import Uploader from "../data/Uploader";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Dashboard =() => {
  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
      <Uploader/>
    </Row>
  );
}

export default Dashboard;

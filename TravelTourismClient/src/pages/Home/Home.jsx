import Banner from "../../Shared/Banner";
import TourType from "./TourType/TourType";
import Tourism from "./TourismGuide/Tourism";
import TouristStories from "./TouristStories/TouristStories";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <Banner />
      <Tourism />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TourType />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <TouristStories />
      </motion.div>
    </div>
  );
};

export default Home;

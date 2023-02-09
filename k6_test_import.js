// stress-test.js
import stress-test from "k6_test_stress.js";

export let options = {
      vus: 50,
      duration: '10s'
    };

export default function () {
      stress-test();
}

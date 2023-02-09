    import http from 'k6/http';
    import { Rate } from 'k6/metrics';
    import { check, sleep } from 'k6';

    const failRate = new Rate('failed_requests');

    export let options = {
      stages: [
        { target: 200, duration: '3m' },
        { target: 200, duration: '2.5m' },
        { target: 0, duration: '30s' },
      ],
      thresholds: {
        failed_requests: ['rate<=0'],
        http_req_duration: ['p(95)<500'],
      },
    };

    export default function () {
      const result = http.get('https://test-api.k6.io/public/crocodiles/');
      check(result, {
        'http response status code is 200': result.status === 200,
      });
      failRate.add(result.status !== 200);
      sleep(1);
    }

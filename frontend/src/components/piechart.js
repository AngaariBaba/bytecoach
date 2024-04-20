import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({content}) {
  return (
    <PieChart style={{Color:'white'}}
      series={[
        {
          data: [
            { id: 0, value: content.RuntimeErrors, label: 'Runtime' },
            { id: 1, value: content.LogicalErrors, label: 'Logical' },
            { id: 2, value: content.SyntaxErrors, label: 'Syntax' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
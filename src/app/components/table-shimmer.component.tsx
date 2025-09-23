/** biome-ignore-all lint/suspicious/noArrayIndexKey: Intentional empty key */
import { Card } from '@atomic/atm.card';
import { ShimmerBox } from '@atomic/mol.shimmer/shimmer.component';
import { Table, TBody, TD, TR } from '@atomic/mol.table';
import type React from 'react';

interface TableShimmerProps {
  rows?: number;
  cols?: number;
}

export const TableShimmer: React.FC<TableShimmerProps> = ({ rows = 5, cols = 3 }) => (
  <Card classNameFront="!p-xs">
    <Table>
      <TBody>
        {Array(rows)
          .fill('')
          .map((_i, index) => (
            <TR key={index}>
              {Array(cols)
                .fill('')
                .map((_, idx) => (
                  <TD key={idx} className="text-left">
                    <ShimmerBox height="10px" />
                  </TD>
                ))}
            </TR>
          ))}
      </TBody>
    </Table>
  </Card>
);

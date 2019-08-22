import React from "react";

import Heatmap from "../Heatmap";
import { LegendConfiguration } from "../Heatmap/Legend";
import { CellConfiguration } from "../Heatmap/types";
import { MarginConfiguration } from "../types";

import CalendarHeatmapTooltip from "./Tooltip";
import { DateString, Datum } from "./types";
import { computeHeatmapData, formatDate } from "./utils";

interface CalendarHeatmapProps {
  data: Datum[];
  colorRange: [string, string];
  thresholds: number[];

  startDay?: DateString;
  endDay?: DateString;
  axis?: {
    bottom: { enable: boolean };
    left: { enable: boolean };
    right: { enable: boolean };
    top: { enable: boolean };
  };
  cell?: CellConfiguration;
  isInteractive?: boolean;
  legend?: LegendConfiguration;
  margin?: MarginConfiguration;
  tooltipComponent?: React.FC<{ data: Datum }>;
}

export const defaultProps = {
  cell: {
    forceSquare: true,
    marginRatio: 0.2,
    radius: 0
  },
  isInteractive: true,
  legend: {
    enable: true,
    expandToChartWidth: false,
    formatLabels: null,
    includeEmptyColor: true,
    margin: { left: 8, right: 8, top: 0, bottom: 0 },
    sideLabels: ["Less", "More"] as [string, string]
  },
  margin: { left: 40, right: 8, top: 24, bottom: 32 },
  tooltipComponent: CalendarHeatmapTooltip
};

const CalendarHeatmap = ({
  axis,
  cell = defaultProps.cell,
  colorRange,
  data,
  endDay,
  isInteractive = defaultProps.isInteractive,
  legend = defaultProps.legend,
  margin = defaultProps.margin,
  startDay,
  thresholds,
  tooltipComponent: HeatmapTooltipComponent = defaultProps.tooltipComponent
}: CalendarHeatmapProps) => {
  const {
    heatmapData,
    getDateFromDatum,
    formatTickX,
    formatTickY
  } = computeHeatmapData(data, startDay, endDay);
  const heatmapAxis = {
    bottom: {
      enable: axis ? axis.bottom.enable : false,
      formatTick: formatTickX
    },
    left: {
      enable: axis ? axis.left.enable : true,
      formatTick: formatTickY,
      tickValues: [1, 3, 5]
    },
    right: {
      enable: axis ? axis.right.enable : false,
      formatTick: formatTickY,
      tickValues: [1, 3, 5]
    },
    top: {
      enable: axis ? axis.top.enable : true,
      formatTick: formatTickX
    }
  };

  return (
    <Heatmap
      axis={heatmapAxis}
      cell={cell}
      colorRange={colorRange}
      data={heatmapData}
      isInteractive={isInteractive}
      legend={legend}
      margin={margin}
      thresholds={thresholds}
      tooltipComponent={props =>
        props.data && (
          <HeatmapTooltipComponent
            data={{
              day: formatDate(getDateFromDatum(props.data)),
              value: props.data.z || 0
            }}
          />
        )
      }
    />
  );
};

export default CalendarHeatmap;

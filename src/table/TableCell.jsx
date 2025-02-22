import React from "react";

const TableCell = ({ config, data }) => {
  const renderCell = () => {
    switch (config.type) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={data.selected}
            onChange={data.onSelect}
          />
        );

      case "image":
        return (
          <img
            src={data[config.dataKey]}
            alt=""
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
          />
        );

      case "user":
        return (
          <div>
            <div style={{ fontWeight: 500 }}>{data[config.dataKey[0]]}</div>
            <div style={{ color: "#666" }}>@{data[config.dataKey[1]]}</div>
          </div>
        );

      case "badge":
        const badgeStyle =
          config.styles[data[config.dataKey]] || config.styles.default;
        return (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "16px",
              ...badgeStyle,
            }}
          >
            {data[config.dataKey]}
          </span>
        );

      case "tags":
        return (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {data[config.dataKey].map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: "4px 8px",
                  borderRadius: "16px",
                  ...config.styles.tag,
                }}
              >
                {tag}
              </span>
            ))}
            {data[config.additionalKey] > 0 && (
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: "16px",
                  backgroundColor: "#F5F5F5",
                  color: "#666",
                }}
              >
                +{data[config.additionalKey]}
              </span>
            )}
          </div>
        );

      default:
        return data[config.dataKey];
    }
  };

  return renderCell();
};

export default TableCell;

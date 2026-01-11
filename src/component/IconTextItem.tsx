import { Box, Typography, SxProps, Theme, alpha } from "@mui/material";

interface IconTextItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  sx?: SxProps<Theme>;
  sxIcon?: SxProps<Theme>;
  sxLabel?: SxProps<Theme>;
}

export default function IconTextItem({
  icon,
  label,
  onClick,
  sx,
  sxIcon,
  sxLabel,
}: IconTextItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "64px",
        cursor: "pointer",
        position: "relative",
        zIndex: 0,
        ...sx,
      }}
    >
      <>{icon}</>
      <Typography
        variant="body2"
        noWrap
        sx={{
          pt: "4px",
          userSelect: "none",
          ...sxLabel,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

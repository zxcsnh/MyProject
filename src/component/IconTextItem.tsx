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
  active,
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
        py: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "36px",
          minHeight: "36px",
          borderRadius: "8px",
          boxShadow: (theme) =>
            `0px 2px 4px 0px ${alpha(theme.palette.common.black, 0.3)}`,
          ...sxIcon,
        }}
      >
        {icon}
      </Box>

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

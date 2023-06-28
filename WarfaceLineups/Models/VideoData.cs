namespace WarfaceLineups.Models;

public record class VideoData(IFormFile Image, bool IsVisibleUploadPreview, string Title, byte TypeGameMap, byte TypeSide, List<bool> TypeGameClass, string Description,
        string UrlOnVideo, string JwtToken, string Login, byte TypeFeature);
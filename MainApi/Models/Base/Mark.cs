using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace MainApi.Models.Abstract
{
    [JsonConverter(typeof(JsonStringEnumMemberConverter))]
    public enum MarkEnum
    {
        [EnumMember(Value = "")] None, X, O
    }

    public class Mark
    {
        public MarkEnum Value { get; set; }
        public bool Status { get; set; }
    }

    static class MarkHelper
    {
        public static void Reset(this Mark mark)
        {
            mark.Status = false;
            mark.Value = MarkEnum.None;
        }
    }
}

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
        public MarkEnum Value { get; set; } = MarkEnum.None;
        public bool Status { get; set; } = false;
    }
}
